/**
 * Get localised time format
 */
const getTimeFormat = (lng: string): string => {
  switch (lng) {
    case 'en':
      return 'h:mm aaaa';
    case 'sv':
      return 'HH:mm';
    case 'fi':
    default:
      return 'HH.mm';
  }
};

export default getTimeFormat;
