/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks';
import capitalize from 'lodash/capitalize';

import * as gqlFns from '../../generated/graphql';
import {
  fakeLocalizedObject,
  fakeNeighborhoods,
} from '../../test/mockDataUtils';
import useDivisionOptions from '../useDivisionOptions';

// Not imported from hook file for a reason :)
const DIVISION_BLOCKLIST = ['aluemeri'];

const divisionBlockListOtions = DIVISION_BLOCKLIST.map((id) => ({
  text: capitalize(id),
  value: `kaupunginosa:${id}`,
}));

const divisionIds = [
  'aluemeri',
  'meilahti',
  'herttoniemi',
  'sörnäinen',
  'kruununhaka',
  'ullanlinna',
];

const divisionData = divisionIds.map((id) => ({
  id: `kaupunginosa:${id}`,
  name: fakeLocalizedObject(capitalize(id)),
}));

beforeEach(() => {
  jest.spyOn(gqlFns, 'useNeighborhoodListQuery').mockReturnValue({
    data: {
      neighborhoodList: fakeNeighborhoods(divisionData.length, divisionData),
    },
  } as any);
});

it('returns divisions without blocklisted divisions', () => {
  const { result } = renderHook(() => useDivisionOptions());

  // result shouldn't contain any of the
  divisionBlockListOtions.forEach((blockOption) => {
    expect(result.current).not.toContainEqual(blockOption);
  });
});
