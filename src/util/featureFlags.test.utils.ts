import * as FeatureFlags from './featureFlags';

export const setFeatureFlags = (
  override: Partial<FeatureFlags.FeatureFlags>
): void => {
  const spy = jest.spyOn(FeatureFlags, 'getFeatureFlags');
  spy.mockReturnValue(override as FeatureFlags.FeatureFlags);
};
