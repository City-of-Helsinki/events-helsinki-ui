import { ClientFunction } from 'testcafe';

export const getPathname = ClientFunction(() => document.location.pathname);
