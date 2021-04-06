import sortBy from 'lodash/sortBy';

import { Neighborhood, useNeighborhoodListQuery } from '../generated/graphql';
import getLocalisedString from '../util/getLocalisedString';
import useLocale from './useLocale';

export const DIVISION_BLOCKLIST = ['kaupunginosa:aluemeri'];

type DivisionOption = {
  text: string;
  value: string;
};

const useDivisionOptions = (): DivisionOption[] => {
  const locale = useLocale();
  const { data: neighborhoodsData } = useNeighborhoodListQuery();
  const neighborhoodList = neighborhoodsData?.neighborhoodList.data;
  const filteredNeighborhoodList = neighborhoodList?.filter((option) =>
    DIVISION_BLOCKLIST.every((blockOption) => blockOption !== option.id)
  );

  const neighborhoodOptionList =
    filteredNeighborhoodList?.map((neighborhood: Neighborhood) => ({
      text: getLocalisedString(neighborhood.name, locale),
      value: neighborhood.id,
    })) ?? [];

  return sortBy(neighborhoodOptionList, 'text');
};

export default useDivisionOptions;
