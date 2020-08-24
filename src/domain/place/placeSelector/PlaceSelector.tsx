import { IconHome } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import MultiSelectDropdown from '../../../common/components/multiSelectDropdown/MultiSelectDropdown';
import { usePlaceListQuery } from '../../../generated/graphql';
import useDebounce from '../../../hooks/useDebounce';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import isClient from '../../../util/isClient';
import PlaceText from '../PlaceText';
const { getPlaceDetailsFromCache } = isClient
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../utils')
  : { getPlaceDetailsFromCache: null };

interface Props {
  inputValue?: string;
  name: string;
  setInputValue?: (newVal: string) => void;
  setPlaces: (places: string[]) => void;
  value: string[];
}

const PlaceSelector: React.FC<Props> = ({
  inputValue,
  name,
  setPlaces,
  setInputValue,
  value,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const [internalInputValue, setInternalInputValue] = React.useState('');
  const input = inputValue !== undefined ? inputValue : internalInputValue;
  const searchValue = useDebounce(input, 300);

  const { data: placesData } = usePlaceListQuery({
    variables: {
      hasUpcomingEvents: true,
      pageSize: 10,
      text: searchValue,
    },
  });

  const placeOptions = React.useMemo(() => {
    return placesData
      ? placesData.placeList.data
          .map(place => ({
            text: getLocalisedString(place.name || {}, locale),
            value: place.id || '',
          }))
          .sort((a, b) => (a.text > b.text ? 1 : -1))
      : [];
  }, [locale, placesData]);

  const renderOptionText = (id: string) => {
    try {
      const place = getPlaceDetailsFromCache(id);

      return getLocalisedString(
        (place && place.placeDetails.name) || {},
        locale
      );
    } catch {
      return <PlaceText id={id} />;
    }
  };

  return (
    <>
      <MultiSelectDropdown
        checkboxName="placeOptions"
        icon={<IconHome />}
        inputValue={input}
        name={name}
        onChange={setPlaces}
        options={placeOptions}
        renderOptionText={renderOptionText}
        selectAllText={t('eventSearch.search.selectAllPlaces')}
        setInputValue={setInputValue || setInternalInputValue}
        showSelectAll={true}
        title={t('eventSearch.search.titleDropdownPlace')}
        value={value}
      />
    </>
  );
};

export default PlaceSelector;
