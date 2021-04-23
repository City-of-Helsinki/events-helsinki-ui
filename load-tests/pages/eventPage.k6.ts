import { getEventFields } from '../../src/domain/event/EventUtils';
import { EventFields } from '../../src/domain/event/types';
import { loadEventDetails } from '../utils/graphql.utils.k6';
import { loadImage, loadUrlDocument } from '../utils/utils.k6';

export const loadEventPage = (eventId: string): void => {
  loadUrlDocument('EVENT', eventId);
  const { data } = loadEventDetails(eventId);
  loadEventImage(data.eventDetails);
};

export const loadEventImage = (event: EventFields): void => {
  const { imageUrl } = getEventFields(event, 'fi');
  loadImage(imageUrl);
};
