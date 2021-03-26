import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { KeywordListDocument } from '../../../../generated/graphql';
import IconMovies from '../../../../icons/IconMovies';
import IconMusic from '../../../../icons/IconMusic';
import { fakeKeywords } from '../../../../test/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../test/testUtils';
import { EVENT_CATEGORIES } from '../../../eventSearch/constants';
import LandingPageSearchSection, {
  popularCategoriesContainerTestId,
  SearchProps,
} from '../LandingPageSearchSection';

configure({ defaultHidden: true });

const searchValue = 'jaz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordsResponse,
  },
];

const popularCategories = [
  {
    icon: <IconMovies />,
    text: 'Elokuvat',
    value: EVENT_CATEGORIES.MOVIE,
  },
  {
    icon: <IconMusic />,
    text: 'Musiikki',
    value: EVENT_CATEGORIES.MUSIC,
  },
  {
    icon: <IconMusic />,
    text: 'Kulttuuri ja taide',
    value: EVENT_CATEGORIES.CULTURE,
  },
];

const renderComponent = (props?: Partial<SearchProps>) => {
  return render(
    <LandingPageSearchSection
      popularCategories={popularCategories}
      searchPlaceholder="placeholder"
      title="Löydä tekemistä"
      type="event"
      {...props}
    />,
    { mocks }
  );
};

test('should render all categories buttons', () => {
  renderComponent({ popularCategories });

  popularCategories.forEach((category) => {
    expect(
      screen.queryByRole('button', { name: category.text })
    ).toBeInTheDocument();
  });
});

test('should route to event search page after clicking submit button', async () => {
  const { history } = renderComponent();

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(``);
});

test('should route to course search page after clicking submit button', async () => {
  const { history } = renderComponent({ type: 'course' });

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe('/fi/courses');
  expect(history.location.search).toBe(``);
});

test('should route to event search page with correct search query after clicking submit button', async () => {
  const { history } = renderComponent();

  const searchInput = screen.getByRole('textbox', {
    name: /löydä tekemistä/i,
  });
  userEvent.type(searchInput, searchValue);

  // Check that auto-suggest menu is open
  expect(screen.getByText(/hakuehdotuksia/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(`?text=${searchValue}`);
});

test('should route to event search page after clicking autosuggest menu item', async () => {
  const { history } = renderComponent();

  const searchInput = screen.getByRole('textbox', {
    name: /löydä tekemistä/i,
  });
  userEvent.type(searchInput, searchValue);

  // Wait autosuggest search internal input debounce
  await waitFor(() => {
    screen.getByRole('option', { name: /musiikkiklubit/i });
  });

  userEvent.click(screen.getByRole('option', { name: /musiikkiklubit/i }));
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(`?text=musiikkiklubit`);
});

test('should route to event search page after clicking category', async () => {
  const { history } = renderComponent();

  userEvent.click(screen.getByText(/kulttuuri ja taide/i));

  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?categories=culture');
});

test('toggling categories in mobile work correctly', () => {
  renderComponent();

  expect(screen.getByTestId(popularCategoriesContainerTestId)).not.toHaveClass(
    'categoriesOpen'
  );

  const showPopularCategoriesButton = screen.getByRole('button', {
    name: translations.home.search.showPopularCategories,
  });

  expect(showPopularCategoriesButton).toHaveAttribute('aria-expanded', 'false');
  userEvent.click(showPopularCategoriesButton);
  expect(showPopularCategoriesButton).toHaveAttribute('aria-expanded', 'true');

  expect(screen.getByTestId(popularCategoriesContainerTestId)).toHaveClass(
    'categoriesOpen'
  );

  expect(
    screen.queryByRole('button', {
      name: translations.home.search.showPopularCategories,
    })
  ).not.toBeInTheDocument();

  const hidePopularCategoriesButton = screen.getByRole('button', {
    name: translations.home.search.hidePopularCategories,
  });
  expect(hidePopularCategoriesButton).toHaveAttribute('aria-expanded', 'true');
  userEvent.click(hidePopularCategoriesButton);
  expect(hidePopularCategoriesButton).toHaveAttribute('aria-expanded', 'false');

  expect(screen.getByTestId(popularCategoriesContainerTestId)).not.toHaveClass(
    'categoriesOpen'
  );
});
