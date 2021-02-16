import { useContext } from 'react';

import {
  ServerRequestContext,
  ServerRequestContextType,
} from '../contexts/ServerRequestContext';
import isClient from '../util/isClient';

export const useURIComponents = (): ServerRequestContextType => {
  // ReqContext is only used on sever side render so this return only the default values "" on client side render
  // in client side we get this info from window.location
  let { host, url } = useContext(ServerRequestContext);

  if (isClient) {
    host = `${window.location.protocol}//${window.location.hostname}`;
    url = window.location.pathname;
  }
  return { host, url };
};
