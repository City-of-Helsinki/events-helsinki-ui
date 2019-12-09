import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventListQuery } from "../../generated/graphql";
import Layout from "../app/layout/Layout";
import SearchResultList from "./SearchResultList";

const EventSearchPageContainer: React.FC<RouteComponentProps> = props => {
  const { data: eventsData, loading } = useEventListQuery();

  return (
    <Layout>
      <LoadingSpinner isLoading={loading}>
        {eventsData && (
          <>
            <SearchResultList eventsData={eventsData} />
          </>
        )}
      </LoadingSpinner>
    </Layout>
  );
};

export default withRouter(EventSearchPageContainer);
