import json
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape


def main():

    data = json.loads(Path("static/data/workflows.json").read_text())
    env = Environment(
        loader=FileSystemLoader("src/templates/"),
        autoescape=select_autoescape(),
        trim_blocks=True,
        lstrip_blocks=True,
    )
    template = env.get_template("workflow_template.md.j2")
    md_dir = Path("docs/workflows/all_workflows")
    for entry in data:
        repo_full_name = entry["repo"]
        md_path = md_dir / f"{repo_full_name.split('/')[-1]}.md"
        output = template.render(**entry)
        md_path.write_text(output, encoding="utf-8")
        print(f"Rendered {md_path}")


if __name__ == "__main__":
    main()
