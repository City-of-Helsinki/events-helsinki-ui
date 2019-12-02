export default (snakecase: string) => {
  return (
    snakecase[0].toLowerCase() +
    snakecase
      .substr(1)
      .toLowerCase()
      .replace(/(_[a-z])/g, $1 => $1.toUpperCase().replace("_", ""))
  );
};
