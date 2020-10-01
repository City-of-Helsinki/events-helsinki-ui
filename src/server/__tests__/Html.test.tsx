import * as React from 'react';
// Use react-test-renderer to avoid <html> cannot appear as a child of <div> warning
import renderer from 'react-test-renderer';

import Html from '../Html';

test('Html matches snapshot', () => {
  const canonicalUrl = 'http://localhost:3000';

  const props = {
    assets: {
      css: ['test1.css', 'test2.css'],
      js: ['test1.js', 'test2.js'],
    },
    content: '<p>Test content</p>',
    canonicalUrl,
    helmet: {
      link: {
        toComponent: (): React.ReactElement => (
          <link rel="canonical" href={canonicalUrl} />
        ),
      },
      meta: {
        toComponent: (): React.ReactElement => (
          <meta name="description" content="testing react helmet" />
        ),
      },

      title: {
        toComponent: (): React.ReactElement => <title>Test title</title>,
      },
    },
    initialI18nStore: {
      en: {},
      fi: {},
      sv: {},
    },
    initialLanguage: 'fi',
    state: {},
  };

  const el = renderer.create(<Html {...props} />);

  expect(el.toTree()).toMatchSnapshot();
});
