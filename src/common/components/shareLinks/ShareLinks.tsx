import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as LinkIcon } from "../../../assets/icons/svg/link.svg";
import isClient from "../../../util/isClient";
import CopyButton from "../copyButton/CopyButton";
import FacebookShareLink from "./FacebookShareLink";
import LinkedInShareLink from "./LinkedInShareLink";
import styles from "./shareLinks.module.scss";
import TwitterShareLink from "./TwitterShareLink";

export interface ShareLinksProps {
  title: string;
}

const ShareLinks: React.FC<ShareLinksProps> = ({ title }) => {
  const { t } = useTranslation();
  // We are using the client only accessible href. By doing this, we do not need
  // to pass the original request from the server. This same pattern was used in
  // MyHelsinki. Limitation is that sharing buttons will be re-rendered on client
  // side because href value is different
  const href = isClient ? window.location.href : "";

  return (
    <div className={styles.shareSubSection}>
      <p className={styles.shareSubSectionTitle}>{title}</p>
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
                {t("commons.shareLinks.messageLinkCopySuccess")}
              </span>
            }
            aria-label={t("commons.shareLinks.buttonCopyLink")}
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
