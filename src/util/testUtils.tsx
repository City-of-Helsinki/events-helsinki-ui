import { fireEvent } from '@testing-library/react';

export const arrowUpKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const enterKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 13, key: 'Enter' });

export const escKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });
