import { ReactElement } from "react";

export interface AutosuggestMenuItem {
  text: string;
  type: string;
}

export interface Category {
  icon?: ReactElement;
  text: string;
  value: string;
}
