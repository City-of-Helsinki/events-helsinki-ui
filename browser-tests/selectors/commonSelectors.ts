import { screen } from '@testing-library/testcafe';

export const commonSelectors = {
  loadingSpinner: screen.findByTestId('loading-spinner'),
};
