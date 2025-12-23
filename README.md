# mpusp.github.io

[![Deploy to GitHub Pages](https://github.com/MPUSP/mpusp.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MPUSP/mpusp.github.io/actions/workflows/deploy.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/MPUSP/mpusp-github-io)](https://github.com/MPUSP/mpusp.github.io/actions/workflows/deploy.yml)

A homepage for the bioionformatic platform of the Max-Planck-Unit for the Science of Pathogens ([MPUSP](mpusp.mpg.de)).
This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.
All data to render the less-static parts of the website (repo and user stats) are retrieved from Github using API requests.
The website is automatically updated and built once per week, and on pull requests to the `main` branch.

### Structure

- The website is build using the Github action `.github/workflows/deploy.yml`.
- The website building is tested for each PR to main with `.github/workflows/test-deploy.yml`
- The Github action will retrieve public data from the Github API using two scripts
  - `src/scripts/generate_page.py`: collects all relevant data and stores it in `static/data/*.json`
  - `src/scripts/generate_workflow_md.py`: collects relevant workflow data and renders an info page in markdown format, exported to `docs/workflows/all_workflows/*.md`
- static page data is located in the `docs/` dir, where also new `.md` docs can be added
- all custom website elements and styles (cards, bar charts, etc) are located in `src/components`
- global color and style definitions are located in `src/css/custom.css`
- global header, footer, and metadata definition is located in `docusaurus.config.js`

### Dependencies

To develop the page locally, create a conda environment with the required packages:

```bash
conda create -n docusaurus -c conda-forge python pygithub jinja2 nodejs
conda activate docusaurus
```

To create a test page, run:

```bash
npm create-docusaurus@latest docusaurus-test classic
```

### Local Development

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```bash
npm start
```

To build the website locally, run:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
