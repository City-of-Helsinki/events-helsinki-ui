import classNames from "classnames";
import React from "react";

import { ReactComponent as LinkIcon } from "../../assets/icons/svg/link.svg";
import CopyButton from "../../common/components/copyButton/CopyButton";
import FacebookShareLink from "../../common/components/shareLink/FacebookShareLink";
import LinkedInShareLink from "../../common/components/shareLink/LinkedInShareLink";
import TwitterShareLink from "../../common/components/shareLink/TwitterShareLink";
import { formatMessage } from "../../common/translation/TranslationUtils";
import isClient from "../../util/isClient";
import styles from "./eventShareLinks.module.scss";

function useClientHref(): string | null {
  return isClient ? window.location.href : null;
}

const ShareLinks: React.FunctionComponent = () => {
  // We are using the client only accessible href. By doing this, we do not need
  // to pass the original request from the server. This same pattern was used in
  // MyHelsinki. Limitations are that the first render of the page will not
  // include the sharing buttons.
  const href = useClientHref();

  if (href === null) {
    return null;
  }

  return (
    <div className={styles.shareSubSection}>
      <p className={styles.shareSubSectionTitle}>
        {formatMessage("event.shareLinks.title")}
      </p>
      <ul className={styles.shareLinkList}>
        <li
          className={classNames(styles.shareLinkItem, styles.relativePosition)}
        >
          <CopyButton
            type="button"
            string={href}
            className={styles.copyButton}
            successClass={styles.linkCopyButtonSuccess}
            successMessage={
              <span className={styles.successTooltip}>
                {formatMessage("event.shareLinks.messageLinkCopySuccess")}
              </span>
            }
            aria-label={formatMessage("event.shareLinks.buttonCopyLink")}
          >
            <LinkIcon />
          </CopyButton>
        </li>
        <li className={styles.shareLinkItem}>
          <FacebookShareLink sharedLink={href} />
        </li>
        <li className={styles.shareLinkItem}>
          <TwitterShareLink sharedLink={href} />
        </li>
        <li className={styles.shareLinkItem}>
          <LinkedInShareLink sharedLink={href} />
        </li>
      </ul>
    </div>
  );
};

export default ShareLinks;
