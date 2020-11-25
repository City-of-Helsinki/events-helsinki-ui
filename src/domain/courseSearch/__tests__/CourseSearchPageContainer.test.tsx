import React from 'react';

import { configure, render, screen } from '../../../util/testUtils';
import CourseSearchPageContainer from '../CourseSearchPageContainer';

configure({ defaultHidden: true });

it('renders nicely', () => {
  render(<CourseSearchPageContainer />);

  expect(
    screen.queryByRole('heading', { name: 'Löydä harrastus' })
  ).toBeInTheDocument();
});
