import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as FacebookIcon } from '../../../assets/icons/svg/facebook.svg';
import ShareLinkBase from './ShareLinkBase';
import { ShareLinkProps } from './types';

const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php';

const FacebookShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation();

  const queryParameters = { u: sharedLink };
  const linkLabel = t('commons.shareLink.shareOnFacebook');

  return (
    <ShareLinkBase
      url={fbShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<FacebookIcon />}
    />
  );
};

export default FacebookShareLink;
