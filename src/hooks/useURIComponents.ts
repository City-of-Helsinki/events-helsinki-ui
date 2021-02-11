import { useContext } from 'react';

import { ReqContext, ReqContextType } from '../server/ServerApp';
import isClient from '../util/isClient';

export const useURIComponents = (): ReqContextType => {
  let { host, url } = useContext(ReqContext);

  if (isClient) {
    host = `${window.location.protocol}//${window.location.hostname}`;
    url = window.location.pathname;
  }
  return { host, url };
};
