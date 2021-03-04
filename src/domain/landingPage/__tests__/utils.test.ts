import { LandingPageFieldsFragment } from '../../../generated/graphql';
import { fakeBanner, fakeLandingPage } from '../../../test/mockDataUtils';
import { getLandingPageFields } from '../utils';

describe('getLandingPageFields function', () => {
  it('should return empty string as default value if field is not defined', () => {
    const landingPage = fakeLandingPage({
      metaInformation: { fi: null },
      pageTitle: { fi: null },
      topBanner: fakeBanner({
        buttonText: { fi: null },
        buttonUrl: { fi: null },
        description: { fi: null },
      }),
      bottomBanner: fakeBanner({
        buttonText: { fi: null },
        buttonUrl: { fi: null },
        description: { fi: null },
      }),
    }) as LandingPageFieldsFragment;
    const {
      topBanner: {
        buttonText: topBannerButtonText,
        buttonUrl: topBannerButtonUrl,
        description: topBannerDescription,
      },
      metaInformation,
      pageTitle,
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
    expect(bottomBannerButtonText).toBe('');
    expect(bottomBannerButtonUrl).toBe('');
    expect(bottomBannerDescription).toBe('');
  });
});
