import isClient from "./isClient";

export default () => {
  if (isClient) {
    window.scrollTo(0, 0);
  }
};
