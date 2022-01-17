export type FeatureFlags = {
  SHOW_SIMILAR_EVENTS: boolean;
  SHOW_SIMILAR_COURSES: boolean;
};

export const getFeatureFlags = (): FeatureFlags => ({
  SHOW_SIMILAR_EVENTS: process.env.REACT_APP_SHOW_SIMILAR_EVENTS === 'true',
  SHOW_SIMILAR_COURSES: process.env.REACT_APP_SHOW_SIMILAR_COURSES === 'true',
});

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean =>
  getFeatureFlags()[feature];
