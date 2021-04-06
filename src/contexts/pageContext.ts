import { createContext } from 'react';

export type PageContextType = {
  title: string;
};

export const PageContext = createContext<PageContextType>({
  title: '',
});
