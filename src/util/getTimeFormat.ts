/**
 * Get localised time format
 */
export default (lng: string) => {
  switch (lng) {
    case "en":
      return "h:mm a";
    case "sv":
      return "HH:mm";
    case "fi":
    default:
      return "HH.mm";
  }
};
