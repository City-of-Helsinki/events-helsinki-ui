import React from "react";
import { useParams } from "react-router";

import isClient from "../../util/isClient";
import Layout from "../app/layout/Layout";
import styles from "./collectionPage.module.scss";

interface RouteParams {
  id: string;
}

const CollectionPageContainer: React.FC = () => {
  const params = useParams<RouteParams>();
  console.log("Collection:", params.id);

  React.useEffect(() => {
    // Scroll to top when collection changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.collectionPageWrapper}>COLLECTION</div>
    </Layout>
  );
};

export default CollectionPageContainer;
