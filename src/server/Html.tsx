import React from "react";
import serialize from "serialize-javascript";

interface Props {
  assets: {
    css: string[];
    js: string[];
  };
  content: string;
  helmet: {
    meta: {
      toComponent: () => void;
    };
    title: {
      toComponent: () => void;
    };
    link: {
      toComponent: () => void;
    };
  };
  state: object;
  canonicalUrl: string;
  initialI18nStore: object;
  initialLanguage: string;
}

const Html: React.FC<Props> = ({
  assets,
  content,
  helmet,
  state,
  canonicalUrl,
  initialI18nStore,
  initialLanguage
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        {helmet.link.toComponent()}
        {assets.css &&
          assets.css.map((c: string, idx: number) => (
            <link key={idx} href={c} rel="stylesheet" />
          ))}
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: [
              `window.initialI18nStore=${serialize(initialI18nStore, {
                isJSON: true
              })};`,
              `window.initialLanguage="${initialLanguage}";`
            ].join("\n")
          }}
        />
        {assets.js &&
          assets.js.map((j: string, idx: number) => (
            <script key={idx} src={j} />
          ))}
      </body>
    </html>
  );
};

export default Html;
