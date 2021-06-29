import i18next from 'i18next';
import * as React from 'react';

import { render, screen, waitFor, within } from '../../../test/testUtils';
import { CATEGORY_CATALOG } from '../../eventSearch/constants';
import {
  getCourseCategoryOptions,
  getCourseHobbyTypeOptions,
  getEventCategoryOptions,
} from '../../eventSearch/utils';
import LandingPage from '../LandingPage';
import {
  coursesPopularCategoriesContainerTestId,
  eventsPopularCategoriesContainerTestId,
} from '../landingPageSearchSection/LandingPageSearchSection';

const t = i18next.t.bind(i18next);

describe('LandingPageSearch popular categories', () => {
  test("Landing page's popular event categories should not contain secondary items", async () => {
    render(<LandingPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    const popularCategoriesContainer = within(
      screen.queryByTestId(eventsPopularCategoriesContainerTestId)
    );
    const categoryOptions = getEventCategoryOptions(
      t,
      CATEGORY_CATALOG.General.default
    );
    const categoryButtons = popularCategoriesContainer.queryAllByRole('link');
    expect(categoryButtons.length).toBe(categoryOptions.length);
    expect(categoryButtons).toMatchSnapshot();
  });

  test("Landing page's popular course categories should not contain secondary items", async () => {
    render(<LandingPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    const popularCategoriesContainer = within(
      screen.queryByTestId(coursesPopularCategoriesContainerTestId)
    );
    const categoryOptions = [
      ...getCourseCategoryOptions(t, CATEGORY_CATALOG.Course.landingPage),
      ...getCourseHobbyTypeOptions(t, CATEGORY_CATALOG.hobbyTypes.landingPage),
    ];
    const categoryButtons = popularCategoriesContainer.queryAllByRole('link');
    expect(categoryButtons.length).toBe(categoryOptions.length);
    expect(categoryButtons).toMatchSnapshot();
  });
});
