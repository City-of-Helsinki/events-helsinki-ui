import React from "react";

import { ReactComponent as FacebookIcon } from "../../../assets/icons/svg/facebook.svg";
import { formatMessage } from "../../translation/TranslationUtils";
import ShareLinkBase from "./ShareLinkBase";
import { ShareLinkProps } from "./types";

const fbShareUrl = "https://www.facebook.com/sharer/sharer.php";

const FacebookShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const queryParameters = { u: sharedLink };
  const linkLabel = formatMessage("commons.shareLink.shareOnFacebook");

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
