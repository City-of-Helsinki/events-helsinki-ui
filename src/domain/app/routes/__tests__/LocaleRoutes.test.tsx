import React from 'react';
import { withRouter } from 'react-router';

import { render } from '../../../../util/testUtils';
import LocaleRoutes from '../LocaleRoutes';

const AppWithRouter = withRouter(LocaleRoutes);

it('renders without crashing', () => {
  render(<AppWithRouter />);
});
