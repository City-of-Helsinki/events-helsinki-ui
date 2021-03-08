import React from 'react';

import i18n from '../../test/test18nInit';
import { render } from '../../test/testUtils';
import ServerApp, { ServerAppProps } from '../ServerApp';

const host = 'https://localhost';

const renderComponent = (props?: Partial<ServerAppProps>) => {
  return render(
    <ServerApp
      client={null}
      staticContext={{}}
      i18n={i18n}
      serverRequestContext={{ host, url: '/testpath' }}
      {...props}
    />
  );
};

it('renders without crashing', () => {
  renderComponent();
});

// Unfortunately it is challenging to test with other languages because we would need to
// init i18n with different language also
describe('redirections', () => {
  it('redirects "/" to "/fi/home"', () => {
    testRedirection('/');
  });

  it(`redirects "/fi" to "/fi/home`, () => {
    testRedirection('/fi');
  });

  it(`redirects "/fi/" to "/fi/home`, () => {
    testRedirection('/fi/');
  });
});

const testRedirection = (url: string) => {
  const staticContext = {};
  const expectedRedirectPath = '/fi/home';
  renderComponent({
    staticContext,
    serverRequestContext: { host, url },
    i18n,
  });

  expect(staticContext).toMatchObject({
    url: expectedRedirectPath,
    location: {
      pathname: expectedRedirectPath,
    },
  });
};
