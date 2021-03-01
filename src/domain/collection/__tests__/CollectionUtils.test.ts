import { CollectionFieldsFragment } from '../../../generated/graphql';
import { fakeCollection } from '../../../test/mockDataUtils';
import {
  getCollectionFields,
  getHeroBackgroundColor,
  getHeroBackgroundImage,
} from '../CollectionUtils';
import { COLLECTION_DEFAULT_IMAGE, HERO_BACKGROUND_COLOR } from '../constants';

describe('getCollectionFields function', () => {
  it('should return empty string as default value is field value is not defined', () => {
    const collection = fakeCollection({
      description: { fi: null },
      eventListQuery: { fi: null },
      eventListTitle: { fi: null },
      linkText: { fi: null },
      linkUrl: { fi: null },
      socialMediaDescription: { fi: null },
      title: { fi: null },
    }) as CollectionFieldsFragment;
    const {
      description,
      eventListQuery,
      eventListTitle,
      linkText,
      linkUrl,
      socialMediaDescription,
      title,
    } = getCollectionFields(collection, 'fi');

    expect(description).toBe('');
    expect(eventListQuery).toBe('');
    expect(eventListTitle).toBe('');
    expect(linkText).toBe('');
    expect(linkUrl).toBe('');
    expect(socialMediaDescription).toBe('');
    expect(title).toBe('');
  });
});

describe('getHeroBackgroundColor function', () => {
  it('should return correct hero background color', () => {
    const collection = fakeCollection({
      boxColor: HERO_BACKGROUND_COLOR.COPPER,
    }) as CollectionFieldsFragment;

    expect(getHeroBackgroundColor(collection)).toBe('copper');

    collection.boxColor = HERO_BACKGROUND_COLOR.ENGEL;
    expect(getHeroBackgroundColor(collection)).toBe('engel');

    collection.boxColor = HERO_BACKGROUND_COLOR.FOG;
    expect(getHeroBackgroundColor(collection)).toBe('fog');

    collection.boxColor = HERO_BACKGROUND_COLOR.SUOMENLINNA;
    expect(getHeroBackgroundColor(collection)).toBe('suomenlinna');

    collection.boxColor = 'not exist';
    expect(getHeroBackgroundColor(collection)).toBe('engel');
  });
});

describe('getHeroBackgroundImage function', () => {
  it('should return default hero background image', () => {
    const collection = fakeCollection({
      heroImage: { url: '' },
    }) as CollectionFieldsFragment;

    expect(getHeroBackgroundImage(collection)).toBe(COLLECTION_DEFAULT_IMAGE);
  });
});
