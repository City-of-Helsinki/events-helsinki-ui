// eslint-disable-next-line import/no-unresolved
import { Selection } from 'k6/html';

import { loadUrlDocument } from '../utils/utils.k6';
export const loadEventSearchPage = (): Selection => loadUrlDocument('EVENTS');
