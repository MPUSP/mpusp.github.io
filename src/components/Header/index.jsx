import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

export default function Header() {
    return (
        <div className={[styles.header, styles.section_padding].join(" ")}>
            <div className={styles.header_image}>
                <ThemedImage
                    alt="MPUSP Logo"
                    sources={{
                        light: useBaseUrl("/img/mpusp_logo_small.png"),
                        dark: useBaseUrl("/img/mpusp_logo_small.png"),
                    }}
                />
            </div>
            <div className={styles.header_content}>
                <h1>
                    The MPUSP Bioinformatics Platform:
                    Workflows for Reproducible Science.
                </h1>
                <div className={styles.header_content_input}>
                    <Link to="/docs/projects/intro"
                        className="button button--secondary button--lg">
                        Projects
                    </Link>
                    <Link to="/docs/workflows/workflow_overview"
                        className="button button--secondary button--lg">
                        Explore workflows
                    </Link>
                    <Link to="/blog"
                        className="button button--secondary button--lg">
                        News
                    </Link>
                </div>
            </div>
        </div>
    );
}
