import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import statsJson from "@site/static/data/org_stats.json";

export default function Stats() {
    const data = statsJson.data ?? statsJson;
    const stats = [
        {
            number: data ? `${(data.members)}` : "",
            content: "Members",
        },
        {
            number: data ? `${(data.repositories)}` : "",
            content: "Repositories",
        },
        {
            number: data ? `${(data.stars)}` : "",
            content: "Stars",
        },
        {
            number: data ? `${(data.watchers)}` : "",
            content: "Watchers",
        },
    ];
    const stats2 = [
        {
            number: data ? `${(data.forks)}` : "",
            content: "Forks",
        },
        {
            number: data ? `${(data.commits)}` : "",
            content: "Commits",
        },
        {
            number: data ? `${(data.deployments)}` : "",
            content: "Deployments",
        },
        {
            number: data ? `${(data.open_issues)}` : "",
            content: "Open Issues",
        },
    ];

    return (
        <div className={[styles.about, styles.section_padding].join(" ")}>
            <div className={styles.about_description}>
                <h1>Our Github Projects</h1>
                <p>
                    More than 30 open-source{" "}
                    <Link to="https://github.com/MPUSP/repositories">MPUSP repositories</Link>{" "}
                    are available on Github, representing a diverse range of projects.
                </p>
            </div>
            <div className={styles.stats_container}>
                <div className={styles.stats1_card}>
                    {stats.map(({ number, content }, index) => (
                        <Link key={index}
                            to="https://github.com/MPUSP/repositories">
                            <div className={styles.card}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.stats2_card}>
                    {stats2.map(({ number, content }, index) => (
                        <Link key={index}
                            to="https://github.com/MPUSP/repositories">
                            <div className={styles.card}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}