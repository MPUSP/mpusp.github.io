import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import statsJson from "@site/static/data/member_stats.json";

const statsKeys = [
  { label: "Public repos", key: "public_repos", symbol: " 📦" },
  { label: "Followers", key: "followers", symbol: " 👥" },
  { label: "Starred", key: "starred", symbol: " ⭐" },
  { label: "Watched", key: "watched", symbol: " 👁️" },
];

export default function MemberCards() {
  const members = Array.isArray(statsJson.data)
    ? statsJson.data
    : Array.isArray(statsJson)
    ? statsJson
    : [];

  return (
    <section className={styles.membersSection}>
      <header className={styles.sectionHeader}>
        <h2>Our main contributors</h2>
        <p>
          Public GitHub stats for each of our organization members, including
          former ones.
        </p>
      </header>
      <div className={styles.membersGrid}>
        {members.map((member, index) => {
          const key = member.name ?? `member-${index}`;
          return (
            <article key={key} className={styles.card}>
              <h3>{member.name ?? "Anonymous"}</h3>
              <p className={styles.memberSubtitle}>
                <Link to={`https://github.com/${member.github_name}`}>
                  @{member.github_name}
                </Link>
              </p>
              <div className="avatar avatar--vertical">
                <img
                  className="avatar__photo avatar__photo--xl"
                  src={`https://avatars.githubusercontent.com/${member.github_name}`}
                />
              </div>
              <p className={styles.memberSubtitle}>
                {member.organizations.map((org, index) => {
                  const orgKey = `${key}-org-${index}`;
                  return (
                    <Link key={orgKey} to={`https://github.com/${org}`}>
                      {`${org} `}
                    </Link>
                  );
                })}
              </p>
              <dl className={styles.statsList}>
                {statsKeys.map((stat) => (
                  <div key={stat.key} className={styles.statsItem}>
                    <dt>{stat.label}</dt>
                    <dd>
                      {member[stat.key] ?? 0}
                      {stat.symbol ?? ""}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
