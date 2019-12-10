import {
  EventDetails,
  Image,
  LocalizedObject,
  LocationDivision,
  Maybe
} from "../../generated/graphql";

export type LocationInList = {
  addressLocality: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
  divisions: Maybe<
    Array<
      Pick<LocationDivision, "type"> & {
        name: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
      }
    >
  >;
  name: Maybe<Pick<LocalizedObject, "fi" | "en" | "sv">>;
  streetAddress: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
};

export type EventInList = Pick<EventDetails, "id" | "startTime" | "endTime"> & {
  images: Array<Pick<Image, "id" | "name" | "url">>;
  location: Maybe<LocationInList>;
  name: Pick<LocalizedObject, "fi" | "en" | "sv">;
};
