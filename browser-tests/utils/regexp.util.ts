import { selectRandomValueFromArray } from './random.utils';

export const regExpEscaped = (text: string, flags?: string): RegExp => {
  return new RegExp(escapeRegExp(text), flags);
};
export const escapeRegExp = (text: string): string => {
  return text.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const splitBySentences = (text: string): string[] =>
  text
    .replace(/(<[^>]*>|[.,!?()])/g, '____')
    .split('____')
    .map((s) => s.trim())
    .filter((s) => /[^.,!?()]+/.test(s));

export const getRandomSentence = (text: string): string => {
  return selectRandomValueFromArray(splitBySentences(text));
};
