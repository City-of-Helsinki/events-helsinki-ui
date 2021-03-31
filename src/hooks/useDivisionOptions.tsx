import sortBy from 'lodash/sortBy';

import { Neighborhood, useNeighborhoodListQuery } from '../generated/graphql';
import getLocalisedString from '../util/getLocalisedString';
import useLocale from './useLocale';

const AREA_BLOCKLIST = ['kaupunginosa:aluemeri'];

type DivisionOption = {
  text: string;
  value: string;
};

const useDivisionOptions = (): DivisionOption[] => {
  const locale = useLocale();
  const { data: neighborhoodsData } = useNeighborhoodListQuery();
  const neighborhoodList = neighborhoodsData?.neighborhoodList.data;
  const filteredNeighborhoodOptionList = neighborhoodList?.filter((option) =>
    AREA_BLOCKLIST.every((blockOption) => blockOption !== option.id)
  );

  const neighborhoodToOptionValue = (neighborhood: Neighborhood) => ({
    text: getLocalisedString(neighborhood.name, locale),
    value: neighborhood.id,
  });

  const neighborhoodOptionList =
    filteredNeighborhoodOptionList?.map(neighborhoodToOptionValue) ?? [];

  return sortBy(neighborhoodOptionList, 'text');
};

export default useDivisionOptions;
