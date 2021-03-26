import * as FeatureFlags from '../../util/featureFlags';

export const setFeatureFlags = (
  override: Partial<FeatureFlags.FeatureFlags>
): void => {
  jest
    .spyOn(FeatureFlags, 'getFeatureFlags')
    .mockReturnValue(override as FeatureFlags.FeatureFlags);
  jest
    .spyOn(FeatureFlags, 'isFeatureEnabled')
    .mockImplementation((feature): boolean => override[feature]);
};
