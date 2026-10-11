import type { AnchorHTMLAttributes } from "react";

// Every link that leaves the site opens in a new tab, so visitors never lose
// the portfolio. noopener/noreferrer keeps the new tab from reaching back.
export default function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
