import React from "react";
import { useLocation } from "react-router";

import isClient from "../../util/isClient";

export const updateLocaleParam = (
  url: string,
  currentLocale: string,
  value: string
) => {
  return url.replace(`/${currentLocale}/`, `/${value}/`);
};

/**
 * Ensure that browser scrolls to top when navigating using
 * <Link> from react-router-dom.
 *
 * Implementation fetched from
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 *
 * @return  {null}
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

/**
 * Ensure that browser focus is set to body when navigating using
 * <Link> from react-router-dom.
 *
 * @return  {null}
 */
export function SetFocusToBody() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (isClient) {
      document.body.focus();
    }
  }, [pathname]);

  return null;
}
