import React from 'react';

import MultiSelectDropdown, {
  MultiselectDropdownProps,
} from '../../../common/components/multiSelectDropdown/MultiSelectDropdown';
import { usePlaceListQuery } from '../../../generated/graphql';
import useDebounce from '../../../hooks/useDebounce';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import isClient from '../../../util/isClient';
import PlaceText from '../PlaceText';
const { getPlaceDetailsFromCache } = isClient
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../utils')
  : /* istanbul ignore next */
    { getPlaceDetailsFromCache: null };

type Props = Omit<MultiselectDropdownProps, 'options'>;

const PlaceSelector: React.FC<Props> = ({
  inputValue,
  setInputValue,
  ...props
}) => {
  const locale = useLocale();

  const [internalInputValue, setInternalInputValue] = React.useState('');
  const input = inputValue !== undefined ? inputValue : internalInputValue;
  const searchValue = useDebounce(input, 300);

  const { data: placesData, error } = usePlaceListQuery({
    skip: !searchValue,
    variables: {
      divisions: ['kunta:helsinki'],
      hasUpcomingEvents: true,
      pageSize: 10,
      text: searchValue,
    },
  });

  const placeOptions = React.useMemo(() => {
    return (placesData?.placeList.data || [])
      .map((place) => ({
        text: getLocalisedString(place.name, locale),
        value: place.id as string,
      }))
      .sort((a, b) => (a.text > b.text ? 1 : -1));
  }, [locale, placesData]);

  const renderOptionText = (id: string) => {
    try {
      const place = getPlaceDetailsFromCache(id);
      return getLocalisedString(place.placeDetails.name, locale);
    } catch {
      return <PlaceText id={id} />;
    }
  };

  return (
    <MultiSelectDropdown
      {...props}
      inputValue={input}
      options={placeOptions}
      renderOptionText={renderOptionText}
      setInputValue={setInputValue || setInternalInputValue}
    />
  );
};

export default PlaceSelector;
