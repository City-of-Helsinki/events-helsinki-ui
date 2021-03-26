import { useNeighborhoodListQuery } from '../generated/graphql';
import getLocalisedString from '../util/getLocalisedString';
import useLocale from './useLocale';

type DivisionOption = {
  text: string;
  value: string;
};

const useDivisionOptions = (): DivisionOption[] => {
  const locale = useLocale();
  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  return neighborhoodsData
    ? neighborhoodsData.neighborhoodList.data
        .map((neighborhood) => ({
          text: getLocalisedString(neighborhood.name, locale),
          value: neighborhood.id,
        }))
        .sort((a, b) => (a.text >= b.text ? 1 : -1))
    : [];
};

export default useDivisionOptions;
