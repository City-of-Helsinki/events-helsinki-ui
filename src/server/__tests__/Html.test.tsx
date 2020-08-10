import * as React from 'react';
import renderer from 'react-test-renderer';

import Html from '../Html';

test('Html matches snapshot', () => {
  const assets = {
    css: ['test1.css', 'test2.css'],
    js: ['test1.js', 'test2.js'],
  };
  const content = '<p>Test content</p>';
  const canonicalUrl = 'http://localhost:3000';
  // Helmet.renderStatic() is not available on client side so use mock data to test
  const helmet = {
    link: {
      toComponent: () => `<link rel="canonical" href="${canonicalUrl}" />`,
    },
    meta: {
      toComponent: () =>
        '<meta data-react-helmet="true" name="description" content="testing react helmet">',
    },
    title: {
      toComponent: () => '<title>Test title</title>',
    },
  };

  const component = renderer.create(
    <Html
      assets={assets}
      content={content}
      helmet={helmet}
      state={{}}
      canonicalUrl={canonicalUrl}
      initialI18nStore={{
        en: {},
        fi: {},
        sv: {},
      }}
      initialLanguage="fi"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
