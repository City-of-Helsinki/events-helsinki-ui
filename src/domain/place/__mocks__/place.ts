import { PlaceFieldsFragment } from '../../../generated/graphql';

const place: PlaceFieldsFragment = {
  __typename: 'Place',
  addressLocality: {
    __typename: 'LocalizedObject',
    en: 'Espoo',
    fi: 'Espoo',
    sv: 'Esbo',
  },
  divisions: [
    {
      __typename: 'Division',
      name: {
        __typename: 'LocalizedObject',
        en: 'Espoo',
        fi: 'Espoo',
        sv: 'Esbo',
      },
      type: 'muni',
    },
  ],
  email: 'grasa.nuoriso@espoo.fi',
  hasUpcomingEvents: false,
  id: 'tprek:20037',
  infoUrl: {
    __typename: 'LocalizedObject',
    en:
      'https://www.espoo.fi/fi-FI/Nuoret/Kivaa_tekemista/Nuorisotilat/Grasan_taitojen_talo',
    fi:
      'https://www.espoo.fi/fi-FI/Nuoret/Kivaa_tekemista/Nuorisotilat/Grasan_taitojen_talo',
    sv:
      'https://www.espoo.fi/fi-FI/Nuoret/Kivaa_tekemista/Nuorisotilat/Grasan_taitojen_talo',
  },
  internalId: 'tprek:20037',
  name: {
    __typename: 'LocalizedObject',
    en: 'Gräsan taitojen talo',
    fi: 'Gräsan taitojen talo',
    sv: 'Gräsan taitojen talo',
  },
  position: {
    __typename: 'PlacePosition',
    coordinates: [24.758753, 60.173878],
  },
  postalCode: '02200',

  streetAddress: {
    __typename: 'LocalizedObject',
    en: 'Luomanportti 2',
    fi: 'Luomanportti 2',
    sv: 'Bäckporten 2',
  },
  telephone: {
    __typename: 'LocalizedObject',
    en: '+358 9 8163 0495',
    fi: '+358 9 8163 0495',
    sv: '+358 9 8163 0495',
  },
};

export default place;
