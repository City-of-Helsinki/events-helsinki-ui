import React from "react";
import { useTranslation } from "react-i18next";

import ShareLinks from "../../../common/components/shareLinks/ShareLinks";
import styles from "./collectionShareLinks.module.scss";

const CollectionShareLinks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.collectionShareLinks}>
      <ShareLinks title={t("collection.shareLinks.title")} />
    </div>
  );
};

export default CollectionShareLinks;
