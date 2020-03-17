import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { DEFAULT_SOME_IMAGE } from "../../../constants";
import useLocale from "../../../hooks/useLocale";
import isClient from "../../../util/isClient";

interface Props {
  className?: string;
  title?: string;
}

const PageWrapper: React.FC<Props> = ({
  children,
  className,
  title = "appName"
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const translatedTitle =
    title !== "appName" ? `${t(title)} - ${t("appName")}` : t("appName");

  const path = isClient
    ? window.location.pathname.replace(`/${locale}/`, "")
    : "";

  const image = DEFAULT_SOME_IMAGE;

  const openGraphProperties: { [key: string]: string } = {
    image: image,
    title: translatedTitle
  };

  return (
    <div className={className}>
      <Helmet>
        <html lang={locale} />
        <title>{translatedTitle}</title>
        <meta name="twitter:card" content="summary" />
        <link rel="alternate" hrefLang="fi" href={"/fi/" + path} />
        <link rel="alternate" hrefLang="sv" href={"/sv/" + path} />
        <link rel="alternate" hrefLang="en" href={"/en/" + path} />

        {Object.entries(openGraphProperties).map(([property, value]) => (
          <meta key={property} property={`og:${property}`} content={value} />
        ))}
      </Helmet>
      {children}
    </div>
  );
};

export default PageWrapper;
