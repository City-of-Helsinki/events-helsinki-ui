import React from 'react';
import { Helmet } from 'react-helmet';

import { StaticPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';

interface Props {
  staticPage: StaticPageFieldsFragment;
}

const StaticPageMeta: React.FC<Props> = ({ staticPage }) => {
  const locale = useLocale();

  const keywords = staticPage.keywords?.[locale]
    ?.map((keyword) => keyword?.toLowerCase())
    .join(', ');

  return (
    <Helmet>
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default StaticPageMeta;
