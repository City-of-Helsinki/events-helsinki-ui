import React from 'react';

import i18n from '../../test/test18nInit';
import { render } from '../../util/testUtils';
import ServerApp from '../ServerApp';

it('renders without crashing', () => {
  render(<ServerApp client={null} context={{}} i18n={i18n} url="/testpath" />);
});
