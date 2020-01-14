import React from "react";

import { ReactComponent as LinkedInIcon } from "../../../assets/icons/svg/linkedin.svg";
import { formatMessage } from "../../translation/TranslationUtils";
import ShareLinkBase from "./ShareLinkBase";
import { ShareLinkProps } from "./types";

const linkedInShareUrl = "https://linkedin.com/shareArticle";

const LinkedInShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const queryParameters = { url: sharedLink };
  const linkLabel = formatMessage("commons.shareLink.shareOnLinkedIn");

  return (
    <ShareLinkBase
      url={linkedInShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<LinkedInIcon />}
    />
  );
};

export default LinkedInShareLink;
