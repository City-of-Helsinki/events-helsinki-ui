import { navigationStylesForSSR } from 'hds-react';
import React from 'react';
import serialize from 'serialize-javascript';

type HelmetDatum = { toComponent: () => void };

interface Props {
  assets: {
    css: string[];
    js: string[];
  };
  content: string;
  helmet: {
    link: HelmetDatum;
    meta: HelmetDatum;
    title: HelmetDatum;
  };
  state: Record<string, unknown>;
  canonicalUrl: string;
  initialI18nStore: Record<string, unknown>;
  initialLanguage: string;
}

const Html: React.FC<Props> = ({
  assets,
  content,
  helmet,
  state,
  canonicalUrl,
  initialI18nStore,
  initialLanguage,
}) => {
  return (
    <html lang={initialLanguage}>
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        {helmet.link.toComponent()}
        {Array.from(document.head.getElementsByTagName('style'))
          .map((style) => <style type={style.type}>{style.innerHTML}</style>)
          .push(
            <style type="text/css" key="navigationStyles">
              ${navigationStylesForSSR}
            </style>
          )}
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
              '\\u003c'
            )};`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: [
              `window.initialI18nStore=${serialize(initialI18nStore, {
                isJSON: true,
              })};`,
              `window.initialLanguage="${initialLanguage}";`,
            ].join('\n'),
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
