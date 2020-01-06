import i18n from "../common/translation/i18n/i18nInit";
import { Language } from "../types";

export default (): Language => {
  const language = i18n.language;

  switch (language) {
    case "en":
    case "fi":
    case "sv":
      return language;
    default:
      return "fi";
  }
};
