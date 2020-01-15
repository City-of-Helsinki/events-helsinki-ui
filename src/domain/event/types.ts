import {
  Division,
  EventDetails,
  Image,
  Keyword,
  LocalizedObject,
  Maybe,
  Offer
} from "../../generated/graphql";

type OfferInList = Pick<Offer, "isFree"> & {
  price: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
  infoUrl: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
};

type KeywordInList = Pick<Keyword, "id"> & {
  name: Pick<LocalizedObject, "fi" | "sv" | "en">;
};

type LocationInList = {
  addressLocality: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
  divisions: Maybe<
    Array<
      Pick<Division, "type"> & {
        name: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
      }
    >
  >;
  name: Maybe<Pick<LocalizedObject, "fi" | "en" | "sv">>;
  streetAddress: Maybe<Pick<LocalizedObject, "fi" | "sv" | "en">>;
};

export type EventInList = Pick<EventDetails, "id" | "startTime" | "endTime"> & {
  images: Array<Pick<Image, "id" | "name" | "url">>;
  keywords: Array<KeywordInList>;
  location: Maybe<LocationInList>;
  name: Pick<LocalizedObject, "fi" | "en" | "sv">;
  offers: Array<OfferInList>;
};
