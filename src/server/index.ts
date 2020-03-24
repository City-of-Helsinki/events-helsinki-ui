import "isomorphic-fetch";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import express, { Request, Response } from "express";
import i18nextMiddleware from "i18next-express-middleware";
import React from "react";
import { getDataFromTree } from "react-apollo";
import ReactDOMServer from "react-dom/server";
import Helmet from "react-helmet";

import i18next from "../common/translation/i18n/init.server";
import { SUPPORT_LANGUAGES } from "../constants";
import getDomainFromRequest from "../util/getDomainFromRequest";
import { getAssets } from "./assets";
import Html from "./Html";
import ServerApp from "./ServerApp";

const OK = "OK";
const SERVER_IS_NOT_READY = "SERVER_IS_NOT_READY";

interface StaticContext {
  url?: string;
}

let serverIsReady = false;

const signalReady = () => {
  serverIsReady = true;
};

const checkIsServerReady = (response: Response) => {
  if (serverIsReady) {
    response.send(OK);
  } else {
    response.status(500).send(SERVER_IS_NOT_READY);
  }
};

const getInitialI18nStore = (req: Request) => {
  const initialI18nStore: { [key: string]: string | object } = {};

  Object.values(SUPPORT_LANGUAGES).forEach((l: string) => {
    initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
  });

  return initialI18nStore;
};

const app = express();

app.use(express.static(__dirname, { index: false }));

app.use(i18nextMiddleware.handle(i18next));

app.get("/healthz", (request, response) => {
  checkIsServerReady(response);
});

app.get("/readiness", (request, response) => {
  checkIsServerReady(response);
});

app.use(async (req: Request, res: Response) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_BASE_URL
    }),
    ssrMode: true
  });
  const context: StaticContext = {};

  const el = React.createElement(ServerApp, {
    client,
    context,
    i18n: req.i18n,
    url: req.url
  });

  // Function to generate html and send response to client
  // Use this also if any GraphQl request fails
  const generateHtmlAndSendResponse = () => {
    // Extracts apollo client cache
    const state = client.extract();
    const content = ReactDOMServer.renderToString(el);
    const helmet = Helmet.renderStatic();
    const assets = getAssets();
    const initialI18nStore = getInitialI18nStore(req);
    const initialLanguage = req.i18n.languages[0];
    const htmlEl = React.createElement(Html, {
      assets,
      canonicalUrl: `${getDomainFromRequest(req)}${req.url}`,
      content,
      helmet,
      initialI18nStore,
      initialLanguage,
      state
    });

    const html = ReactDOMServer.renderToString(htmlEl);

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.status(200);
      res.send(`<!doctype html>${html}`);
      res.end();
    }
  };

  try {
    // Executes all graphql queries for the current state of application
    await getDataFromTree(el);

    generateHtmlAndSendResponse();
  } catch (e) {
    // await getDataFromTree(el) fails if any GraphQl request fails.
    // Try to generate html withour apollo state
    // TODO: Downside is that page is re-rendered on client which causes blinking
    try {
      generateHtmlAndSendResponse();
    } catch (e) {
      res.send("Something went very very wrong. Failed to catch error.");
    }
  }
});

const port = process.env.REACT_APP_SSR_PORT || 3000;

app.listen(port, () => {
  signalReady();

  // eslint-disable-next-line no-console
  console.log(`Server listening on ${port} port`);
});
