import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { StaticRouter } from "react-router-dom";

import { appRoutes } from "../domain/app/BrowserApp";

interface Props {
  client: ApolloClient<object>;
  context: object;
  url: string;
}

const ServerApp: React.FC<Props> = ({ client, context, url }) => {
  return (
    <ApolloProvider client={client}>
      <StaticRouter location={url} context={context}>
        {appRoutes}
      </StaticRouter>
    </ApolloProvider>
  );
};

export default ServerApp;
