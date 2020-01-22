// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_SORT_OPTIONS {
  DURATION = "duration",
  DURATION_DESC = "-duration",
  END_TIME = "end_time",
  END_TIME_DESC = "-end_time",
  LAST_MODIFIED_TIME = "last_modified_time",
  LAST_MODIFIED_TIME_DESC = "-last_modified_time",
  START_TIME = "start_time",
  START_TIME_DESC = "-start_time"
}

// Finnish keys are used for keywords that do not have an official English
// translation. An approximate translation has been provided on the comment row.
export const CULTURE_KEYWORDS = {
  "Elokuva ja media": "kulke:205", // Films and Media
  Sirkus: "kulke:51", // Circus
  Teatteri: "kulke:33", // theatre
  "Teatteri ja sirkus": "kulke:351", // Theatre and Circus
  art: "yso:p2851",
  "art exhibitions": "yso:p6889",
  "art museums": "yso:p8144",
  "cinema (art forms)": "yso:p16327",
  "contemporary art": "yso:p9593",
  "contemporary dance": "yso:p10105",
  "cultural events": "yso:p360",
  "dance (performing arts)": "yso:p1278",
  exhibitions: "yso:p5121",
  films: "yso:p1235",
  "fine arts": "yso:p2739",
  "literary art": "yso:p7969",
  literature: "yso:p8113",
  "modern art": "yso:p9592",
  museums: "yso:p4934",
  music: "yso:p1808",
  "performing arts": "yso:p2850",
  teatteri: "matko:teatteri", // theatre
  theatre: "yso:p2625" // in Finnish teatteritaide, "theatre arts"
};
