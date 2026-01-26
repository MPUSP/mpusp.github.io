// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MPUSP Bioinformatics",
  tagline: "Activitiy of the MPUSP bioinformatics platform.",
  favicon: "img/mpusp_logo_small.png",

  // Set the production url of your site here
  url: "https://mpusp.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "MPUSP", // Usually your GitHub org/user name.
  projectName: "mpusp.github.io", // Usually your repo name.

  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: "MPUSP Bioinformatics",
        logo: {
          alt: "MPUSP Logo",
          src: "img/mpusp_logo_small.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Projects",
          },
          {
            type: "docSidebar",
            sidebarId: "workflowSidebar",
            position: "left",
            label: "Workflows",
          },
          { to: "/blog", label: "News", position: "left" },
          {
            href: "https://www.mpusp.mpg.de",
            label: "MPUSP",
            position: "right",
          },
          {
            href: "https://github.com/MPUSP",
            label: "MPUSP GitHub",
            position: "right",
          },
          {
            href: "https://github.com/snakemake/snakemake-workflow-catalog",
            label: "Snakemake Workflow Catalog",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/projects/intro",
              },
              {
                label: `Last update: ${new Date().toLocaleDateString()}`,
                to: "https://github.com/MPUSP/mpusp.github.io/actions",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "MPUSP Github",
                href: "https://github.com/MPUSP",
              },
              {
                label: "MPUSP Home Page",
                href: "https://www.mpusp.mpg.de",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "News",
                to: "/blog",
              },
              {
                label: "Docusaurus",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MPUSP bioinformatics.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
