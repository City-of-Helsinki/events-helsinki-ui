import { useMatomo } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { DEFAULT_SOME_IMAGE } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { useURIComponents } from '../../../hooks/useURIComponents';

interface Props {
  className?: string;
  title?: string;
}

const PageWrapper: React.FC<Props> = ({
  children,
  className,
  title = 'appName',
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = useLocale();
  const { trackPageView } = useMatomo();
  const { host, url } = useURIComponents();

  const translatedTitle =
    title !== 'appName' ? `${t(title)} - ${t('appName')}` : t('appName');

  const image = DEFAULT_SOME_IMAGE;

  const openGraphProperties: { [key: string]: string } = {
    image: image,
    title: translatedTitle,
  };

  const path = url.replace(`/${locale}/`, '');

  // Track page view
  useDeepCompareEffect(() => {
    trackPageView({
      documentTitle: translatedTitle,
      href: window.location.href,
    });
  }, [{ pathname: location.pathname, search: location.search }]);

  return (
    <div className={className}>
      <Helmet>
        <html lang={locale} />
        <title>{translatedTitle}</title>
        <meta name="twitter:card" content="summary" />

        <link rel="canonical" href={host + url} />
        <link rel="alternate" hrefLang="fi" href={`${host}/fi/${path}`} />
        <link rel="alternate" hrefLang="sv" href={`${host}/sv/${path}`} />
        <link rel="alternate" hrefLang="en" href={`${host}/en/${path}`} />

        {Object.entries(openGraphProperties).map(([property, value]) => (
          <meta key={property} property={`og:${property}`} content={value} />
        ))}
      </Helmet>
      {children}
    </div>
  );
};

export default PageWrapper;
