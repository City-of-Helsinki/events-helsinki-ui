import {
  BannerPageFieldsFragment,
  LandingPageFieldsFragment,
} from '../../../generated/graphql';
import { fakeBanner, fakeLandingPage } from '../../../util/mockDataUtils';
import {
  getHeroBackgroundImage as getBottomBannerHeroBackgroundImage,
  getHeroBackgroundImageMobile as getBottomBannerHeroBackgroundImageMobile,
  getHeroTitleAndDescriptionColor as getBottomBannerHeroTitleAndDescriptionColor,
  getHeroTopLayerImage as getBottomBannerHeroTopLayerImage,
  getSomeImageUrl as getBottomBannerSomeImageUrl,
} from '../../banner/bannerUtils';
import {
  getHeroBackgroundImage as getTopBannerHeroBackgroundImage,
  getHeroBackgroundImageMobile as getTopBannerHeroBackgroundImageMobile,
  getHeroTitleAndDescriptionColor as getTopBannerHeroTitleAndDescriptionColor,
  getHeroTopLayerImage as getTopBannerHeroTopLayerImage,
  getLandingPageFields,
  getLandingPageSomeImageUrl as getTopBannerSomeImageUrl,
} from '../utils';

describe('getHeroTitleAndDescriptionColor function', () => {
  it('should return defualt value when title and description color is not defined', () => {
    const landingPage = fakeLandingPage({
      titleAndDescriptionColor: { fi: null },
      bottomBanner: fakeBanner({ titleAndDescriptionColor: { fi: null } }),
    }) as LandingPageFieldsFragment;
    const topBannertitleAndDescriptionColor = getTopBannerHeroTitleAndDescriptionColor(
      landingPage,
      'fi'
    );
    expect(topBannertitleAndDescriptionColor).toBe('BLACK');
    const bottomBannerTitleAndDescriptionColor = getBottomBannerHeroTitleAndDescriptionColor(
      'fi',
      landingPage.bottomBanner
    );
    expect(bottomBannerTitleAndDescriptionColor).toBe('BLACK');
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
      bottomBanner: fakeBanner({
        buttonText: { fi: null },
        buttonUrl: { fi: null },
        description: { fi: null },
      }),
    }) as LandingPageFieldsFragment;
    const {
      buttonText: topBannerButtonText,
      buttonUrl: topBannerButtonUrl,
      description: topBannerDescription,
      metaInformation,
      pageTitle,
      title,
      bottomBanner: {
        buttonText: bottomBannerButtonText,
        buttonUrl: bottomBannerButtonUrl,
        description: bottomBannerDescription,
      },
    } = getLandingPageFields(landingPage, 'fi');
    expect(topBannerButtonText).toBe('');
    expect(topBannerButtonUrl).toBe('');
    expect(topBannerDescription).toBe('');
    expect(metaInformation).toBe('');
    expect(pageTitle).toBe('');
    expect(title).toBe('');
    expect(bottomBannerButtonText).toBe('');
    expect(bottomBannerButtonUrl).toBe('');
    expect(bottomBannerDescription).toBe('');
  });
});

describe('getHeroBackgroundImage/getHeroBackgroundImageMobile/getHeroTopLayerImage function', () => {
  it('should return empty string if image is not defined', () => {
    const landingPage = fakeLandingPage({
      heroBackgroundImage: { fi: { url: null } },
      heroBackgroundImageMobile: { fi: { url: null } },
      heroTopLayerImage: { fi: { url: null } },
      bottomBanner: fakeBanner({
        heroBackgroundImage: { fi: { url: null } },
        heroBackgroundImageMobile: { fi: { url: null } },
        heroTopLayerImage: { fi: { url: null } },
      }) as BannerPageFieldsFragment,
    }) as LandingPageFieldsFragment;

    const topBannerBackgroundImage = getTopBannerHeroBackgroundImage(
      landingPage,
      'fi'
    );
    expect(topBannerBackgroundImage).toBe('');

    const topBannerBackgroundImageMobile = getTopBannerHeroBackgroundImageMobile(
      landingPage,
      'fi'
    );
    expect(topBannerBackgroundImageMobile).toBe('');

    const topBannertopLayerImage = getTopBannerHeroTopLayerImage(
      landingPage,
      'fi'
    );
    expect(topBannertopLayerImage).toBe('');

    const bottomBannerBackgroundImage = getBottomBannerHeroBackgroundImage(
      'fi',
      landingPage.bottomBanner
    );
    expect(bottomBannerBackgroundImage).toBe('');

    const bottomBannerBackgroundImageMobile = getBottomBannerHeroBackgroundImageMobile(
      'fi',
      landingPage.bottomBanner
    );
    expect(bottomBannerBackgroundImageMobile).toBe('');

    const bottomBannertopLayerImage = getBottomBannerHeroTopLayerImage(
      'fi',
      landingPage.bottomBanner
    );
    expect(bottomBannertopLayerImage).toBe('');
  });
});

describe('getLandingPageSomeImageUrl function', () => {
  it('should return defualt image if some image is not defined', () => {
    const landingPage = fakeLandingPage({
      socialMediaImage: { fi: { url: null } },
      bottomBanner: fakeBanner({
        socialMediaImage: { fi: { url: null } },
      }) as BannerPageFieldsFragment,
    }) as LandingPageFieldsFragment;
    const topBannerImageUrl = getTopBannerSomeImageUrl(landingPage, 'fi');
    expect(topBannerImageUrl).toBe('/images/activities_SoMe-share.jpg');
    const bottomBannerImageUrl = getBottomBannerSomeImageUrl(
      'fi',
      landingPage.bottomBanner
    );
    expect(bottomBannerImageUrl).toBe('/images/activities_SoMe-share.jpg');
  });
});
