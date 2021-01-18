/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';

import {
  BannerPageFieldsFragment,
  CollectionFieldsFragment,
} from '../utils/generated/graphql';
import { regExpEscaped } from '../utils/regexp.util';

export const landingPageSelectors = {
  withinBanner(banner: BannerPageFieldsFragment, location: 'top' | 'bottom') {
    const withinBanner = () => within(screen.getByTestId(`${location}-banner`));
    return {
      title() {
        return withinBanner().getByRole('heading', {
          name: regExpEscaped(banner.title.fi),
        });
      },
      buttonLink() {
        return withinBanner().getByRole('button', {
          name: regExpEscaped(banner.buttonText.fi),
        });
      },
      descriptionText() {
        return withinBanner().getByText(regExpEscaped(banner.description.fi));
      },
    };
  },
  collectionTitle(collection: CollectionFieldsFragment) {
    return screen.getAllByLabelText(regExpEscaped(collection.title.fi));
  },
};
