import { Request } from 'express';

/** Get domain name from express request */
export default (req: Request): string => {
  // This will return the host as well as the possible port
  const host = req.get('Host');

  return `https://${host}`;
};
