import { LandingPageFieldsFragment } from '../../../generated/graphql';
import { fakeLandingPage } from '../../../util/mockDataUtils';
import {
  getHeroBackgroundImage,
  getHeroBackgroundImageMobile,
  getHeroTitleAndDescriptionColor,
  getHeroTopLayerImage,
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
  it('should return empty string as default value if field is not defined', () => {
    const landingPage = fakeLandingPage({
      buttonText: { fi: null },
      buttonUrl: { fi: null },
      description: { fi: null },
      metaInformation: { fi: null },
      pageTitle: { fi: null },
      title: { fi: null },
    }) as LandingPageFieldsFragment;
    const {
      buttonText,
      buttonUrl,
      description,
      metaInformation,
      pageTitle,
      title,
    } = getLandingPageFields(landingPage, 'fi');
    expect(buttonText).toBe('');
    expect(buttonUrl).toBe('');
    expect(description).toBe('');
    expect(metaInformation).toBe('');
    expect(pageTitle).toBe('');
    expect(title).toBe('');
  });
});

describe('getHeroBackgroundImage/getHeroBackgroundImageMobile/getHeroTopLayerImage function', () => {
  it('should return empty string if image is not defined', () => {
    const landingPage = fakeLandingPage({
      heroBackgroundImage: { fi: { url: null } },
      heroBackgroundImageMobile: { fi: { url: null } },
      heroTopLayerImage: { fi: { url: null } },
    }) as LandingPageFieldsFragment;

    const backgroundImage = getHeroBackgroundImage(landingPage, 'fi');
    expect(backgroundImage).toBe('');

    const backgroundImageMobile = getHeroBackgroundImageMobile(
      landingPage,
      'fi'
    );
    expect(backgroundImageMobile).toBe('');

    const topLayerImage = getHeroTopLayerImage(landingPage, 'fi');
    expect(topLayerImage).toBe('');
  });
});

describe('getLandingPageSomeImageUrl function', () => {
  it('should return defualt image if some image is not defined', () => {
    const landingPage = fakeLandingPage({
      socialMediaImage: { fi: { url: null } },
    }) as LandingPageFieldsFragment;
    const imageUrl = getLandingPageSomeImageUrl(landingPage, 'fi');
    expect(imageUrl).toBe('/images/activities_SoMe-share.jpg');
  });
});
