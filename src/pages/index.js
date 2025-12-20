import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/Header";
import About from "@site/src/components/About";
import Activity from "@site/src/components/Activity";
import Members from "@site/src/components/Members";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <main>
        <Header />
        <hr style={{ border: "0", borderTop: "2px solid #edededff" }} />
        <About />
        <Activity />
        <Members />
      </main>
    </Layout>
  );
}
