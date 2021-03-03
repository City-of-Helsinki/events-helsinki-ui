import React from 'react';

import i18n from '../../test/test18nInit';
import { render } from '../../test/testUtils';
import ServerApp from '../ServerApp';

it('renders without crashing', () => {
  render(
    <ServerApp
      client={null}
      staticContext={{}}
      i18n={i18n}
      serverRequestContext={{ host: 'https://localhost', url: '/testpath' }}
    />
  );
});
