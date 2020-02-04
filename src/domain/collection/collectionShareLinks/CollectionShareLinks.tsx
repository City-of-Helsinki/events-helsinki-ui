import React from "react";
import { useTranslation } from "react-i18next";

import ShareLinks from "../../../common/components/shareLinks/ShareLinks";
import Container from "../../app/layout/Container";
import styles from "./collectionShareLinks.module.scss";

const CollectionShareLinks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.collectionShareLinks}>
      <Container>
        <ShareLinks title={t("collection.shareLinks.title")} />
      </Container>
    </div>
  );
};

export default CollectionShareLinks;
