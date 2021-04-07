import { ReactElement } from 'react';

import { AUTOSUGGEST_TYPES__DEPRECATED } from '../constants';

export interface AutosuggestMenuOption__DEPRECATED {
  text: string;
  type: AUTOSUGGEST_TYPES__DEPRECATED;
  value: string;
}

export interface Category {
  icon?: ReactElement;
  text: string;
  value: string;
}
