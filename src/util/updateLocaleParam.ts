export const updateLocaleParam = (
  url: string,
  currentLocale: string,
  value: string
): string => {
  return url.replace(`/${currentLocale}/`, `/${value}/`);
};
