import userEvent from '@testing-library/user-event';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { render, screen } from '../../../../util/testUtils';
import PageLayout from '../PageLayout';

const getWrapper = () =>
  render(
    <PageLayout>
      <div>PAGE</div>
    </PageLayout>
  );

it('matches snapshot', () => {
  const { container } = getWrapper();
  expect(container.firstChild).toMatchSnapshot();
});

describe('on mobile view', () => {
  it('should have opened by clicking menu button', async () => {
    global.innerWidth = 500;
    getWrapper();

    const button = screen.getByRole('button', {
      name: translations.header.menuToggleAriaLabel,
    });

    userEvent.click(button);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
