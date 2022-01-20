import map from 'lodash/map';

import {
  EventFieldsFragment,
  PlaceFieldsFragment,
} from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeKeyword,
  fakeKeywords,
  fakePlace,
} from '../../../test/mockDataUtils';
import {
  formatPrice,
  getEventFields,
  getEventIdFromUrl,
  getEventIdsFromUrls,
  getEventImageUrl,
  getEventPlaceholderImageUrl,
  getEventSomeImageUrl,
  getKeywordList,
  getLocationId,
  getServiceMapUrl,
} from '../EventUtils';

describe('getKeywordList function', () => {
  it('should sort and capitalize keywords', () => {
    const keywords = fakeKeywords(2, [
      { name: { fi: 'keyword 2' } },
      { name: { fi: 'keyword 1' } },
    ]).data;
    const event = fakeEvent({ keywords }) as EventFieldsFragment;
    const sortedKeywords = getKeywordList(event.keywords, 'fi');

    expect(map(sortedKeywords, 'name')).toStrictEqual([
      'Keyword 1',
      'Keyword 2',
    ]);
  });

  it('should remove duplicate keywords (not case sensitive)', () => {
    const keywords = fakeKeywords(5, [
      { name: { fi: 'keyword 1' } },
      { name: { fi: 'keyword 2' } },
      { name: { fi: 'keyword 2' } },
      { name: { fi: 'KeYwoRD 3' } },
      { name: { fi: 'keyWord 3' } },
    ]).data;
    const event = fakeEvent({ keywords }) as EventFieldsFragment;
    const sortedKeywords = getKeywordList(event.keywords, 'fi');

    expect(map(sortedKeywords, 'name')).toStrictEqual([
      'Keyword 1',
      'Keyword 2',
      'Keyword 3',
    ]);
  });

  it('should not return keyword if id or name is not defined', () => {
    const keywords = [
      { ...fakeKeyword(), id: null },
      { ...fakeKeyword(), name: null },
    ];
    const event = fakeEvent({ keywords }) as EventFieldsFragment;
    const eventKeywords = getKeywordList(event.keywords, 'fi');

    expect(eventKeywords).toHaveLength(0);
  });
});

describe('getEventPlaceholderImageUrl function', () => {
  it('should return event placeholder image url', () => {
    const event = fakeEvent({ id: 'has_no_numbers' }) as EventFieldsFragment;
    expect(getEventPlaceholderImageUrl(event)).toBe(
      '/images/activities_placeholder_imgA.jpg'
    );
    expect(getEventPlaceholderImageUrl({ ...event, id: 'helsinki:221' })).toBe(
      '/images/activities_placeholder_imgB.jpg'
    );
    expect(getEventPlaceholderImageUrl({ ...event, id: 'helsinki:222' })).toBe(
      '/images/activities_placeholder_imgC.jpg'
    );
    expect(getEventPlaceholderImageUrl({ ...event, id: 'helsinki:223' })).toBe(
      '/images/activities_placeholder_imgD.jpg'
    );
    expect(getEventPlaceholderImageUrl({ ...event, id: 'helsinki:224' })).toBe(
      '/images/activities_placeholder_imgA.jpg'
    );
  });
});

describe('getEventImageUrl function', () => {
  it('should return event placeholder image if image is not defined', () => {
    const event = fakeEvent({
      id: 'helsinki:221',
      images: [fakeImage({ url: null })],
    }) as EventFieldsFragment;
    expect(getEventImageUrl(event)).toBe(
      '/images/activities_placeholder_imgB.jpg'
    );
  });
});

describe('getEventSomeImageUrl function', () => {
  it('should return default placeholder image if image is not defined', () => {
    const event = fakeEvent({
      id: 'helsinki:221',
      images: [fakeImage({ url: null })],
    }) as EventFieldsFragment;
    expect(getEventSomeImageUrl(event)).toBe(
      '/images/activities_SoMe-share.jpg'
    );
  });
});

describe('getLocationId function', () => {
  it('should return Palvelukartta compatible location id', () => {
    expect(
      getLocationId(
        fakePlace({
          id: 'tprek:221',
        }) as PlaceFieldsFragment
      )
    ).toBe('221');
    expect(
      getLocationId(
        fakePlace({
          id: null,
        }) as PlaceFieldsFragment
      )
    ).toBe('');
  });
});

describe('getServiceMapUrl function', () => {
  const locationId = 'tprek:123';
  const event = fakeEvent({
    location: { id: locationId, internalId: locationId },
  }) as EventFieldsFragment;

  it('get service map url', () => {
    expect(getServiceMapUrl(event, 'fi', false)).toBe(
      'https://palvelukartta.hel.fi/fi/unit/123'
    );
    expect(getServiceMapUrl(event, 'sv', true)).toBe(
      'https://palvelukartta.hel.fi/sv/embed/unit/123'
    );
  });
});

describe('getEventIdFromUrl function', () => {
  it('get event id', () => {
    expect(
      getEventIdFromUrl('http://localhost:3000/fi/event/helsinki:afxh3naida')
    ).toBe('helsinki:afxh3naida');
    expect(
      getEventIdFromUrl(
        'http://localhost:3000/fi/event/helsinki:afxh3naida?id=123'
      )
    ).toBe('helsinki:afxh3naida');
    expect(
      getEventIdFromUrl(
        'http://localhost:3000/fi/collection/helsinki:afxh3naida'
      )
    ).toBe(undefined);
  });
});

describe('getEventIdsFromUrls function', () => {
  it('gets event idsfrom urls', () => {
    expect(
      getEventIdsFromUrls([
        'http://localhost:3000/fi/event/helsinki:sdbdfh5t',
        'http://localhost:3000/fi/event/helsinki:2346tyhjrfgg',
        'http://localhost:3000/fi/event/helsinki:sdgbdfngfr65',
        'http://localhost:3000/fi/event/helsinki:sdfhgjrfd2',
        'http://localhost:3000/fi/events/helsinki:zxcvsdfdhg',
      ])
    ).toEqual({
      eventIds: [
        'helsinki:sdbdfh5t',
        'helsinki:2346tyhjrfgg',
        'helsinki:sdgbdfngfr65',
        'helsinki:sdfhgjrfd2',
        'helsinki:zxcvsdfdhg',
      ],
    });
  });
});

describe('getEventFields function', () => {
  it('should return false to today and thisWeek fields if startTime is not defined', () => {
    const event = fakeEvent({ startTime: null }) as EventFieldsFragment;
    const { thisWeek, today } = getEventFields(event, 'fi');

    expect(thisWeek).toBe(false);
    expect(today).toBe(false);
  });
});

describe('formatPrice function', () => {
  // test separators
  ['', '-', ',', '.', '/'].forEach((s) => {
    it(`format correctly with separator: ${s}`, () => {
      expect(formatPrice(`12${s}12`)).toEqual(`12${s}12 €`);
    });
  });

  it('adds € with one or more numbers', () => {
    expect(formatPrice('2')).toEqual(`2 €`);
    expect(formatPrice('20')).toEqual(`20 €`);
    expect(formatPrice('222')).toEqual(`222 €`);
  });

  it("doesn't add € when not needed", () => {
    expect(formatPrice('asd12-12')).toEqual(`asd12-12`);
    expect(formatPrice('1212 €')).toEqual(`1212 €`);
    expect(formatPrice('1212€')).toEqual(`1212€`);
    expect(formatPrice('12s12')).toEqual(`12s12`);
  });
});
