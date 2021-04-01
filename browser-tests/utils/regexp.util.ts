import { selectRandomValueFromArray } from './random.utils';

export const regExpEscaped = (text: string, flags?: string): RegExp => {
  return new RegExp(escapeRegExp(text), flags);
};
export const escapeRegExp = (text: string): string => {
  return text.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const splitBySentences = (text: string): string[] =>
  replaceHtmlTags(text)
    .split(/(<[^>]*>|[.,!?()\r\n])/g)
    .map((s) => s.trim())
    .filter((s) => /[^.,!?()\r\n]+/.test(s));

export const getRandomSentence = (text: string): string => {
  return selectRandomValueFromArray(splitBySentences(text));
};

export const replaceHtmlTags = (text: string, replacer = '.'): string =>
  text.replace(/<\/?[^>]+(>|$)/g, replacer);
