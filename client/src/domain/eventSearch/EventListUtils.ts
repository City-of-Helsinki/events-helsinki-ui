import { EventListQuery } from "../../generated/graphql";

export const getNextPage = (
  eventsData: EventListQuery | undefined
): number | null => {
  if (!eventsData || !eventsData.eventList.meta.next) return null;

  const urlParts = eventsData.eventList.meta.next.split("?");
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get("page");
  return page ? Number(page) : null;
};
