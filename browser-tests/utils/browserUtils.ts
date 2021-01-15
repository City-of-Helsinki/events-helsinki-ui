import { ClientFunction } from 'testcafe';

export const getPathname = ClientFunction(() => document.location.pathname);

export const getUrl = ClientFunction(() => document.location.href);

export const getPageTitle = ClientFunction(() => document.title);

export const navigateBack = ClientFunction(() => window.history.back());
