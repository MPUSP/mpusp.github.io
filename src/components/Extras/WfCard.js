import Link from "@docusaurus/Link";
import GhLink from "@site/src/components/Extras/GhLink";
import Card from "@site/src/components/Card";
import CardBody from "@site/src/components/Card/CardBody";
import CardFooter from "@site/src/components/Card/CardFooter";
import CardHeader from "@site/src/components/Card/CardHeader";

export default function WfCard({
  children,
  description,
  update,
  bgValue,
  authors,
  url_mdpage = GhLink(
    children.replace("MPUSP/", ""),
    "/docs/workflows/all_workflows/",
    ""
  ),
  url_repo = GhLink(children, "https://github.com/", ""),
}) {
  const avatarSources = authors.map((login) => ({
    login,
    src: GhLink(login, "https://avatars.githubusercontent.com/", ""),
  }));

  return (
    <Card shadow="tl">
      <CardHeader bgvalue={bgValue}>
        <div className="avatar avatar--vertical">
          <div
            className="avatar__photo-group"
            style={{ display: "flex", gap: "0.25rem" }}
          >
            {avatarSources.map((avatar) => (
              <img
                key={avatar.login}
                className="avatar__photo avatar__photo--md"
                src={avatar.src}
                alt={avatar.login}
              />
            ))}
          </div>
          <div className="avatar__intro">
            <div className="avatar__name">{children}</div>
            <small className="avatar__subtitle">last update: {update}</small>
          </div>
        </div>
      </CardHeader>
      <CardBody repo={children}>
        <div>{description}</div>
      </CardBody>
      <CardFooter>
        <div className="button-group button-group--block">
          <Link className="button button--secondary" to={url_mdpage}>
            workflow page
          </Link>
          <Link className="button button--secondary" to={url_repo}>
            github
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
