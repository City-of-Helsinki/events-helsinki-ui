export type FeatureFlags = {
  SHOW_SIMILAR_EVENTS: boolean;
  EVENTS_HELSINKI_2: boolean;
};

export const getFeatureFlags = (): FeatureFlags => ({
  SHOW_SIMILAR_EVENTS: process.env.REACT_APP_SHOW_SIMILAR_EVENTS === 'true',
  EVENTS_HELSINKI_2: process.env.REACT_APP_EVENTS_HELSINKI_2 === 'true',
});

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean =>
  getFeatureFlags()[feature];
