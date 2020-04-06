import { CollectionDetails, LocalizedObject } from "../../generated/graphql";

export type CollectionInList = Pick<
  CollectionDetails,
  "id" | "curatedEvents" | "eventListQuery"
> & { title: Pick<LocalizedObject, "en" | "fi" | "sv"> };
