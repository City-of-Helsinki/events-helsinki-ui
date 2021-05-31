// eslint-disable-next-line import/no-unresolved
import { Element, Selection } from 'k6/html';

export const getRandomSelectionElement = (
  selectionCollection: Selection
): Element => {
  const randomIndex = Math.floor(Math.random() * selectionCollection.size());
  return selectionCollection.get(randomIndex);
};

export const getRandomElement = <T>(list: T[]): T => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};
