/**
 * Convert snake case string to camel case.
 * This is used to format data got from rest api to desired GraphQL format
 * e.g
 * @event_type => internalEventType
 * event_end_date => eventEndDate
 */
export default (snakecase: string) => {
  const str = snakecase.replace("@", "internal_");
  return (
    str[0].toLowerCase() +
    str
      .substr(1)
      .toLowerCase()
      .replace(/(_[a-z])/g, $1 => $1.toUpperCase().replace("_", ""))
  );
};
