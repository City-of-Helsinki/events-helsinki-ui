import React from "react";

import { useEventDetailsQuery } from "../../generated/graphql";

const EventPageContainer: React.FC = () => {
  const { data, loading } = useEventDetailsQuery({
    variables: { id: "helsinki:afxldwmzom" }
  });

  console.log("test", data, loading);

  return null;
};

export default EventPageContainer;
