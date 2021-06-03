import userEvent from '@testing-library/user-event';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { render, screen, waitFor, within } from '../../../../test/testUtils';
import PageLayout from '../PageLayout';

const renderComponent = () =>
  render(
    <PageLayout>
      <div>PAGE</div>
    </PageLayout>
  );

it('matches snapshot', () => {
  const { container } = renderComponent();
  expect(container.firstChild).toMatchSnapshot();
});

const withinHeader = () => within(screen.getByRole('banner'));

describe('on mobile view', () => {
  it('should have opened by clicking menu button', async () => {
    global.innerWidth = 500;
    renderComponent();

    const button = screen.getByRole('button', {
      name: translations.header.menuToggleAriaLabel,
    });

    // Desktop navigation
    expect(withinHeader().getByRole('navigation')).toBeInTheDocument();

    userEvent.click(button);

    // Desktop navigation and mobile navigation rendered (desktop navigation should be hidden)
    await waitFor(() =>
      expect(withinHeader().getAllByRole('navigation')).toHaveLength(2)
    );
  });
});
