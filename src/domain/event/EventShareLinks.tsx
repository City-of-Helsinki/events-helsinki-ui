import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as LinkIcon } from "../../assets/icons/svg/link.svg";
import CopyButton from "../../common/components/copyButton/CopyButton";
import FacebookShareLink from "../../common/components/shareLink/FacebookShareLink";
import LinkedInShareLink from "../../common/components/shareLink/LinkedInShareLink";
import TwitterShareLink from "../../common/components/shareLink/TwitterShareLink";
import isClient from "../../util/isClient";
import styles from "./eventShareLinks.module.scss";

const ShareLinks: React.FunctionComponent = () => {
  const { t } = useTranslation();
  // We are using the client only accessible href. By doing this, we do not need
  // to pass the original request from the server. This same pattern was used in
  // MyHelsinki. Limitation is that sharing buttons will be re-rendered on client
  // side because href value is different
  const href = isClient ? window.location.href : "";

  return (
    <div className={styles.shareSubSection}>
      <p className={styles.shareSubSectionTitle}>
        {t("event.shareLinks.title")}
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
                {t("event.shareLinks.messageLinkCopySuccess")}
              </span>
            }
            aria-label={t("event.shareLinks.buttonCopyLink")}
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
