import { Language } from "../../types";
import { CollectionInList } from "./types";

/**
 * Test is collection supported in selected language
 * @param {object} collection
 * @param {string} language
 * @return {boolean}
 */
export const isLanguageSupported = (
  collection: CollectionInList,
  language: Language
) => {
  return !!collection.title[language];
};
