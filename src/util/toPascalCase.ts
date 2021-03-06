/**
 * Convert snake case string to pascal case.
 * e.g
 * event_type => EventType
 * event_end_date => EventEndDate
 */
const toPascalCase = (snakecase: string): string => {
  return (
    snakecase[0].toUpperCase() +
    snakecase
      .substr(1)
      .toLowerCase()
      .replace(/(_[a-z])/g, ($1) => $1.toUpperCase().replace('_', ''))
  );
};

export default toPascalCase;
