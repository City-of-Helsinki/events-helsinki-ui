import { ReactElement } from 'react';

import { AUTOSUGGEST_TYPES } from '../constants';

export interface AutosuggestMenuOption {
  text: string;
  type: AUTOSUGGEST_TYPES;
  value: string;
}

export interface Category {
  icon?: ReactElement;
  text: string;
  value: string;
}
