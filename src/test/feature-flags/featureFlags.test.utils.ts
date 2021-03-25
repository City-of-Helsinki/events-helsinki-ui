import * as FeatureFlags from '../../util/featureFlags';

export const setFeatureFlags = (
  override: Partial<FeatureFlags.FeatureFlags>
): void => {
  jest
    .spyOn(FeatureFlags, 'isFeatureEnabled')
    .mockImplementation((feature): boolean => override[feature]);
};
