/** Get domain name */
const getDomain = (): string =>
  `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;

export default getDomain;
