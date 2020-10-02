import { LandingPageFieldsFragment } from '../../../generated/graphql';
import { fakeLandingPage } from '../../../util/mockDataUtils';
import {
  getHeroTitleAndDescriptionColor,
  getLandingPageFields,
  getLandingPageSomeImageUrl,
} from '../utils';

describe('getHeroTitleAndDescriptionColor function', () => {
  it('should return defualt value when title and description color is not defined', () => {
    const landingPage = fakeLandingPage({
      titleAndDescriptionColor: { fi: null },
    }) as LandingPageFieldsFragment;
    const titleAndDescriptionColor = getHeroTitleAndDescriptionColor(
      landingPage,
      'fi'
    );
    expect(titleAndDescriptionColor).toBe('BLACK');
  });
});

describe('getLandingPageFields function', () => {
  it('should return defualt values if field is not defined', () => {
    const landingPage = fakeLandingPage({
      buttonText: { fi: null },
      buttonUrl: { fi: null },
      description: { fi: null },
      pageTitle: { fi: null },
      title: { fi: null },
    }) as LandingPageFieldsFragment;
    const {
      buttonText,
      buttonUrl,
      description,
      pageTitle,
      title,
    } = getLandingPageFields(landingPage, 'fi');
    expect(buttonText).toBe('');
    expect(buttonUrl).toBe('');
    expect(description).toBe('');
    expect(pageTitle).toBe('');
    expect(title).toBe('');
  });

  describe('getLandingPageSomeImageUrl function', () => {
    it('should return defualt social media image', () => {
      const landingPage = fakeLandingPage({
        socialMediaImage: { fi: { url: null } },
      }) as LandingPageFieldsFragment;
      const socialMediaImageUrl = getLandingPageSomeImageUrl(landingPage, 'fi');
      expect(socialMediaImageUrl).toBe('/images/activities_SoMe-share.jpg');
    });
  });
});
