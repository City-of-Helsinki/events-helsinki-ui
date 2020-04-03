import classNames from "classnames";
import { IconAngleRight } from "hds-react";
import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

import styles from "./link.module.scss";

interface Props extends LinkProps {
  color?: "default" | "white";
  isExternal?: boolean;
  size?: "default" | "small";
  to: string;
}

const Link: React.FC<Props> = ({
  color = "default",
  children,
  isExternal = false,
  size = "default",
  to,
  ...rest
}) => {
  return isExternal ? (
    <a
      className={classNames(
        styles.link,
        styles[`${color}Color`],
        styles[`${size}Size`]
      )}
      href={to}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <IconAngleRight />
    </a>
  ) : (
    <RouterLink
      className={classNames(
        styles.link,
        styles[`${color}Color`],
        styles[`${size}Size`]
      )}
      to={to}
      {...rest}
    >
      {children}
      <IconAngleRight />
    </RouterLink>
  );
};

export default Link;
