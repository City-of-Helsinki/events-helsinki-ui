import { createContext } from 'react';

export type ServerRequestContextType = {
  host: string;
  url: string;
};

export const ServerRequestContext = createContext<ServerRequestContextType>({
  host: '',
  url: '',
});
