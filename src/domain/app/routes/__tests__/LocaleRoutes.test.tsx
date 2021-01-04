import React from 'react';
import { withRouter } from 'react-router';

import { render, renderWithRoute, waitFor } from '../../../../util/testUtils';
import { ROUTES } from '../constants';
import LocaleRoutes from '../LocaleRoutes';

const AppWithRouter = withRouter(LocaleRoutes);

it('renders without crashing', () => {
  render(<AppWithRouter />);
});

it('redirects deprecated /event/:id to /events/:id', async () => {
  const id = '123';
  const { history } = renderWithRoute(<AppWithRouter />, {
    routes: [`/fi/event/${id}`],
    path: '/:locale/event/:id',
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      `/fi${ROUTES.EVENT.replace(':id', id)}`
    );
  });
});
