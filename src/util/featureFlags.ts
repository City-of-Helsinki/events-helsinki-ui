export type FeatureFlags = {
  SHOW_SIMILAR_EVENTS: boolean;
};

export const getFeatureFlags = (): FeatureFlags => ({
  SHOW_SIMILAR_EVENTS: process.env.REACT_APP_SHOW_SIMILAR_EVENTS === 'true',
});

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean =>
  getFeatureFlags()[feature];
