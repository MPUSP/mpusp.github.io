import os
import json
import logging
from pathlib import Path
from github import Github
from github import Auth
import datetime
import heapq
import hashlib
import requests


# logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)


# functions
# ---------
def get_total_commits(repo):
    """Get total commits in a repository."""
    try:
        counts = repo.get_commits().totalCount
    except:
        counts = 0
    return counts


def get_total_deployments(repo):
    """Get total deployments in a repository."""
    try:
        counts = repo.get_deployments().totalCount
    except:
        counts = 0
    return counts


def get_commit_history(repo):
    """Get commit history for a repository."""
    total = get_total_commits(repo)
    if total:
        return {
            i.sha: {
                "author": i.author.login if i.author else i.commit.author.name,
                "date": i.commit.author.date,
            }
            for i in repo.get_commits()
        }
    else:
        return {}


def get_commits_last_days(repo, limit, author=None):
    """Count commits within the last month for all repos."""
    return sum(
        1
        for commit in repo["commits"].values()
        if commit["date"] > limit and (author is None or commit["author"] == author)
    )


def store_data(input, json_output):
    """Store data as JSON."""
    Path(os.path.dirname(json_output)).mkdir(parents=True, exist_ok=True)
    with open(json_output, "w") as out:
        json.dump(input, out, sort_keys=False, indent=2)
    logger.info("wrote %s records to %s", len(input), json_output)


# get readme file for config workflows
def get_config_readme(repo_name):
    """Get readme file for config workflows."""
    fail_text = "## Configuration\n\nNo configuration README available."
    try:
        config_readme_url = f"https://raw.githubusercontent.com/{repo_name}/refs/heads/main/config/README.md"
        response = requests.get(config_readme_url)
        if response.status_code == 200:
            return response.text
        else:
            return fail_text
    except:
        return fail_text


# login and Github API queries
# ----------------------------
# query information from github about the organization
gh_instance = Github(auth=Auth.Token(os.environ["GITHUB_TOKEN"]))
logger.info("authenticated to Github API")
gh_org = gh_instance.get_organization("MPUSP")
logger.info("fetching data for organization")

# get members and their stats
members = {}
for member in gh_org.get_members():
    if member.login is not None and member.login not in ["MPDL-SoLi"]:
        members[member.login] = {
            "followers": member.get_followers().totalCount,
            "public_repos": member.get_repos().totalCount,
            "watched": member.get_watched().totalCount,
            "starred": member.get_starred().totalCount,
            "organizations": [org.login for org in member.get_orgs()],
            "name": member.name,
            "github_name": member.login,
        }
# sort members by starred repos
members = sorted(members.values(), key=lambda member: member["starred"], reverse=True)
logger.info("collected stats for %s members", len(members))

# get repositories
repos = {}
workflows = []
for repo in gh_org.get_repos():
    repos[repo.name] = {
        "full_name": repo.full_name,
        "description": repo.description,
        "public": not repo.private,
        "html_url": repo.html_url,
        "updated_at": repo.updated_at.isoformat(),
        "watchers_count": repo.watchers_count,
        "stargazers_count": repo.stargazers_count,
        "forks_count": repo.forks_count,
        "open_issues_count": repo.open_issues_count,
        "topics": repo.get_topics(),
        "releases": repo.get_releases().totalCount,
        "latest_release": (
            repo.get_latest_release().tag_name
            if repo.get_releases().totalCount > 0
            else None
        ),
        "contributors": [
            i.login for i in repo.get_contributors() if not i.login.endswith("[bot]")
        ],
        "deployments": get_total_deployments(repo),
        "downloads": sum(
            asset.download_count
            for release in repo.get_releases()
            for asset in release.get_assets()
        ),
        "commits_count": get_total_commits(repo),
        "commits": get_commit_history(repo),
    }
    # deposit data about snakemake/nextflow workflows
    if (
        (
            "snakemake-workflow" in repo.topics
            or "nextflow-workflow" in repo.topics
            or ("snakemake" in repo.topics and "workflow" in repo.topics)
            or ("nextflow" in repo.topics and "workflow" in repo.topics)
        )
        and not repo.fork
        and not repo.archived
        and not repo.private
    ):
        workflows.append(
            {
                "repo": repo.full_name,
                "description": repo.description,
                "update": repo.updated_at.isoformat().split("T")[0],
                "release": (
                    repo.get_latest_release().tag_name
                    if repo.get_releases().totalCount > 0
                    else None
                ),
                "topics": repo.get_topics(),
                "readme": get_config_readme(repo.full_name),
                "authors": repos[repo.name]["contributors"],
                "bg_value": round(
                    int(hashlib.md5(repo.name.encode()).hexdigest()[:6], 16)
                    % 360
                    / 360,
                    2,
                ),
            }
        )

# add count of repos a member contributed to
for member in members:
    member["mpusp_repos"] = sum(
        1 for repo in repos.values() if member["github_name"] in repo["contributors"]
    )

# logging
logger.info("collected stats for %s repositories", len(repos))

# create summary data for org
org_stats = {
    "repositories": len(repos),
    "stars": sum(repo["stargazers_count"] for repo in repos.values()),
    "forks": sum(repo["forks_count"] for repo in repos.values()),
    "watchers": sum(repo["watchers_count"] for repo in repos.values()),
    "commits": sum(repo["commits_count"] for repo in repos.values()),
    "open_issues": sum(repo["open_issues_count"] for repo in repos.values()),
    "deployments": sum(repo["deployments"] for repo in repos.values()),
    "downloads": sum(repo["downloads"] for repo in repos.values()),
    "members": len(members),
}

# define time limits
time_limits = {
    f"last_{t}_days": datetime.datetime.now(datetime.UTC) - datetime.timedelta(days=t)
    for t in [365, 90, 30, 7, 1]
}

# get commits for different time limits
commits_by_time = {}
for key, limit in time_limits.items():
    commits_by_time[key] = sum(
        get_commits_last_days(v, limit) for k, v in repos.items()
    )
logger.info("calculated commit counts for different time limits")

# get top N repositories by commits in the last month
commits_by_repo = dict(
    heapq.nlargest(
        5,
        (
            (k, get_commits_last_days(v, time_limits["last_30_days"]))
            for k, v in repos.items()
        ),
        key=lambda item: item[1],
    )
)
logger.info(f"fetched top {len(commits_by_repo)} repositories by commits")

# get activity of top 5 members
commits_by_member = {}
for member in members[0:5]:
    commits_by_member[member["github_name"]] = sum(
        [
            (
                get_commits_last_days(
                    v, time_limits["last_30_days"], author=member["github_name"]
                )
            )
            for k, v in repos.items()
        ]
    )

# merge activity stats in one dict
activity_stats = {
    "commits_by_time": commits_by_time,
    "commits_by_member": commits_by_member,
    "commits_by_repo": commits_by_repo,
}

# export data to json files
store_data(org_stats, "static/data/org_stats.json")
store_data(members, "static/data/member_stats.json")
store_data(activity_stats, "static/data/activity_stats.json")
store_data(workflows, "static/data/workflows.json")
