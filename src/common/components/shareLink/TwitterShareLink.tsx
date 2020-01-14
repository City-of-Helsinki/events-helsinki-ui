import React from "react";

import { ReactComponent as TwitterIcon } from "../../../assets/icons/svg/twitter.svg";
import { formatMessage } from "../../translation/TranslationUtils";
import ShareLinkBase from "./ShareLinkBase";
import { ShareLinkProps } from "./types";

const twitterShareUrl = "https://twitter.com/share";

const TwitterShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const queryParameters = { url: sharedLink };
  const linkLabel = formatMessage("commons.shareLink.shareOnTwitter");

  return (
    <ShareLinkBase
      url={twitterShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<TwitterIcon />}
    />
  );
};

export default TwitterShareLink;
