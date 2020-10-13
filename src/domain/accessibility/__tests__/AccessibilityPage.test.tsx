import React from 'react';
import wait from 'waait';

import { AccessibilityPagesDocument } from '../../../generated/graphql';
import { fakeAccessibilityPages } from '../../../util/mockDataUtils';
import { act, render, screen } from '../../../util/testUtils';
import AccessibilityPage from '../AccessbilityPage';

const fakeAccessibilityPagesResponse = fakeAccessibilityPages(1);

const mocks = [
  {
    request: {
      query: AccessibilityPagesDocument,
    },
    result: {
      data: {
        accessibilityPages: fakeAccessibilityPagesResponse,
      },
    },
  },
];

test('should render accessibility page', async () => {
  render(<AccessibilityPage />, { mocks });

  await act(wait);

  expect(
    screen.getByText(
      fakeAccessibilityPagesResponse.data[0].headingSection?.fi as string
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      fakeAccessibilityPagesResponse.data[0].contentSection?.fi as string
    )
  ).toBeInTheDocument();
});
