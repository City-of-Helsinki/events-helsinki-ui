import "./assets/styles/main.scss";
import "hds-core/lib/base.css";

import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";

import BrowserApp from "./domain/app/BrowserApp";
import * as serviceWorker from "./serviceWorker";

if (process.env.REACT_APP_SENTRY_ENVIRONMENT) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT
  });
}

ReactDOM.hydrate(<BrowserApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
