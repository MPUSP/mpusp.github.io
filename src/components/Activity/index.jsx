import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import statsJson from "@site/static/data/activity_stats.json";

function HorizontalBar({ label, value, max_value }) {
  return (
    <div className={styles.bar_row}>
      <span>{label}</span>
      <div className={styles.bar_track}>
        <div className={styles.bar_fill} style={{ width: `${(value / max_value) * 100}%` }} />
      </div>
      <span>{value}</span>
    </div>
  );
}

export default function Activity() {
  const maxCommitValue = Math.max(...Object.values(statsJson.commits_by_time));
  const stats_commits = Object.entries(statsJson.commits_by_time).map(
    ([period, value]) => ({
      label: period.replace("last_", "").replace("_", " "),
      value: value,
      max_value: maxCommitValue,
    })
  );
  const maxMemberValue = Math.max(...Object.values(statsJson.commits_by_member));
  const stats_members = Object.entries(statsJson.commits_by_member).map(
    ([member, value]) => ({
      label: member,
      value: value,
      max_value: maxMemberValue,
    })
  );
  const maxRepoValue = Math.max(...Object.values(statsJson.commits_by_repo));
  const stats_repos = Object.entries(statsJson.commits_by_repo).map(
    ([repo, value]) => ({
      label: repo,
      value: value,
      max_value: maxRepoValue,
    })
  );

  return (
    <section className={styles.activity}>
      <div className={styles.about_description}>
        <h1>Recent activity</h1>
        <p>
          We strive to build and improve our own workflows, but also to make
          contributions to community projects such as{" "}
          <Link to="https://snakemake.github.io">Snakemake</Link>.
        </p>
      </div>

      <div className={styles.activity_panel}>
        <div className={styles.panelHeader}>
          <h3>Commits overview</h3>
          <h4>(all repos)</h4>
        </div>
        {stats_commits.map((entry) => (
          <HorizontalBar
            key={entry.label}
            label={entry.label}
            value={entry.value}
            max_value={entry.max_value}
          />
        ))}
      </div>

      <div className={styles.activity_panel}>
        <div className={styles.panelHeader}>
          <h3>Top repos by commits</h3>
          <h4>(last 30 days)</h4>
        </div>
        {stats_repos.map((entry) => (
          <HorizontalBar
            key={entry.label}
            label={entry.label}
            value={entry.value}
            max_value={entry.max_value}
          />
        ))}
      </div>

      <div className={styles.activity_panel}>
        <div className={styles.panelHeader}>
          <h3>Commits by Member</h3>
          <h4>(last 30 days)</h4>
        </div>
        {stats_members.map((entry) => (
          <HorizontalBar
            key={entry.label}
            label={entry.label}
            value={entry.value}
            max_value={entry.max_value}
          />
        ))}
      </div>

      <footer className={styles.activity_footer}>
        <p>
          Statistics are automatically retrieved from GitHub.
          Last updates can be viewed on <Link to="https://github.com/MPUSP/mpusp.github.io/actions">Deployment history</Link>.
        </p>
      </footer>
    </section>
  );
}
