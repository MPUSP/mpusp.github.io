---
slug: new-catalog-features
title: New features for the Snakemake Workflow Catalog
authors: [michael]
tags: [announcements]
---

The [Snakemake Workflow Catalog](https://snakemake.github.io/snakemake-workflow-catalog) is rolling out **two new features**!

1. The Catalog now supports automatic rendering of **Tube Maps** using [snakevision](https://github.com/OpenOmics/snakevision). Tube maps will automatically show up on your workflow page if the workflow has an executable test case in `.test` ([details](https://snakemake.github.io/snakemake-workflow-catalog/docs/about/adding_workflows)).

2. The Catalog will automatically render a **Workflow Parameter Table** if your workflow repo contains a `workflow/schemas/config.schema.y(a)ml` or `config/schemas/config.schema.y(a)ml` ([details](docs/about/adding_workflows)). No need to manually maintain a table of parameters on your workflow page anymore.

Here's an [example for a workflow](https://snakemake.github.io/snakemake-workflow-catalog/docs/workflows/MPUSP/snakemake-simple-mapping.html) with a tube map and a parameter table, `MPUSP/snakemake-simple-mapping`.

<!-- truncate -->
