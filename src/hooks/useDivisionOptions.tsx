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
  const filteredNeighborhoodList = getFilteredNeighborhoodList(
    neighborhoodList
  );

  const neighborhoodOptionList =
    filteredNeighborhoodList?.map((neighborhood: Neighborhood) => ({
      text: getLocalisedString(neighborhood.name, locale),
      value: neighborhood.id,
    })) ?? [];

  return sortBy(neighborhoodOptionList, 'text');
};

export const getFilteredNeighborhoodList = (
  data: Neighborhood[] | undefined
): Neighborhood[] => {
  return (
    data?.filter((option) => !DIVISION_BLOCKLIST.includes(option.id)) ?? []
  );
};

export default useDivisionOptions;
