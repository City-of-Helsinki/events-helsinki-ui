import React from "react";
import Helmet from "react-helmet";

import useLocale from "../../hooks/useLocale";

const CommonMeta = () => {
  const locale = useLocale();
  return (
    <Helmet>
      <html lang={locale} />
    </Helmet>
  );
};

export default CommonMeta;
