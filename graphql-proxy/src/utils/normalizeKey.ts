/**
 * Normalize snake case keys to a form that GraphlQL can use
 * Keys with @-prefix are replacing with internal-prefix
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
