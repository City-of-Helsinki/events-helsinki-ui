import { LandingPageFieldsFragment } from '../../../generated/graphql';
export const landingPage: LandingPageFieldsFragment = {
  __typename: 'LandingPage',
  buttonText: {
    __typename: 'LocalizedObject',
    en: 'Button text en:',
    fi: 'Button text fi:',
    sv: 'Button text sv:',
  },
  buttonUrl: {
    __typename: 'LocalizedObject',
    en: 'http://google.com',
    fi: 'http://google.com',
    sv: 'http://google.com',
  },
  description: {
    __typename: 'LocalizedObject',
    en: 'Description en:',
    fi: 'Description fi:',
    sv: 'Description sv:',
  },
  heroBackgroundImage: {
    __typename: 'LocalizedCmsImage',
    en: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimage.png',
    },
    fi: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimage.png',
    },
    sv: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimage.png',
    },
  },
  heroBackgroundImageColor: {
    __typename: 'LocalizedObject',
    en: 'FOG',
    fi: 'FOG',
    sv: 'FOG',
  },
  heroBackgroundImageMobile: {
    __typename: 'LocalizedCmsImage',
    en: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimagemobile.png',
    },
    fi: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimagemobile.png',
    },
    sv: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'testimagemobile.png',
    },
  },
  heroTopLayerImage: {
    __typename: 'LocalizedCmsImage',
    en: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'toplayerimage.png',
    },
    fi: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'toplayerimage.png',
    },
    sv: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'toplayerimage.png',
    },
  },
  id: '8',
  metaInformation: {
    __typename: 'LocalizedObject',
    en: 'Meta information en:',
    fi: 'Meta information fi:',
    sv: 'Meta information sv:',
  },
  pageTitle: {
    __typename: 'LocalizedObject',
    en: 'Page title en:',
    fi: 'Page title fi:',
    sv: 'Page title sv:',
  },
  socialMediaImage: {
    __typename: 'LocalizedCmsImage',
    en: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'socialMediaImage.png',
    },
    fi: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'socialMediaImage.png',
    },
    sv: {
      __typename: 'CmsImage',
      photographerCredit: 'Photographer',
      url: 'socialMediaImage.png',
    },
  },
  title: {
    __typename: 'LocalizedObject',
    en: 'Title en:',
    fi: 'Title fi:',
    sv: 'Title sv:',
  },
  titleAndDescriptionColor: {
    __typename: 'LocalizedObject',
    en: 'WHITE',
    fi: 'WHITE',
    sv: 'WHITE',
  },
};

export default landingPage;
