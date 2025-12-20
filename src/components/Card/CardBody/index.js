import React, { CSSProperties } from "react";
import clsx from "clsx";
import GhLink from "@site/src/components/Extras/GhLink";

const CardBody = ({
  className, // classNamees for the container card
  style, // Custom styles for the container card
  children, // Content to be included within the card
  repo,
  textAlign,
  variant,
  italic = false,
  noDecoration = false,
  transform,
  breakWord = false,
  truncate = false,
  weight,
}) => {
  const text = textAlign ? `text--${textAlign}` : "";
  const textColor = variant ? `text--${variant}` : "";
  const textItalic = italic ? "text--italic" : "";
  const textDecoration = noDecoration ? "text-no-decoration" : "";
  const textType = transform ? `text--${transform}` : "";
  const textBreak = breakWord ? "text--break" : "";
  const textTruncate = truncate ? "text--truncate" : "";
  const textWeight = weight ? `text--${weight}` : "";
  const url_license = GhLink(
    repo,
    "https://img.shields.io/github/license/",
    "?style=for-the-badge&label=license&logo=github"
  );
  const url_issues = GhLink(
    repo,
    "https://img.shields.io/github/issues/",
    "?style=for-the-badge&label=issues&logo=github"
  );
  const url_stars = GhLink(
    repo,
    "https://img.shields.io/github/stars/",
    "?style=for-the-badge&label=stars&logo=github"
  );
  const url_watchers = GhLink(
    repo,
    "https://img.shields.io/github/watchers/",
    "?style=for-the-badge&label=watchers&logo=github"
  );
  return (
    <div
      className={clsx(
        "card__body",
        className,
        text,
        textType,
        textColor,
        textItalic,
        textDecoration,
        textBreak,
        textTruncate,
        textWeight
      )}
      style={style}
    >
      <p style={{ marginBottom: "0.5cm" }}>{children}</p>
      <div>
        <img src={url_license} style={{ marginRight: "0.25cm" }} />
        <img src={url_issues} style={{ marginRight: "0.25cm" }} />
        <img src={url_stars} style={{ marginRight: "0.25cm" }} />
        <img src={url_watchers} style={{ marginRight: "0.25cm" }} />
      </div>
    </div>
  );
};
export default CardBody;
