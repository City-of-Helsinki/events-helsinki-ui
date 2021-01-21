import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import useTabFocusStyle, { focusAttributeName } from '../useTabFocusStyle';

const focusClassName = 'focused';

const TestComponent: React.FC = () => {
  const container = React.useRef<HTMLDivElement | null>(null);
  useTabFocusStyle({
    container,
    className: focusClassName,
  });

  return (
    <div>
      <button type="button">Outside button</button>
      <div ref={container}>
        <button type="button">Button 1</button>
        <div tabIndex={0}>Focusable text</div>
        <div>Non-focusable text</div>
        <button type="button">Button 2</button>
        <button type="button" tabIndex={-1}>
          Button 3
        </button>
        <button type="button">Button 4</button>
        <a href="1">Link 1</a>
        <a href="2">Link 2</a>
      </div>
    </div>
  );
};

const getButton = (name: string) => screen.getByRole('button', { name });
const getLink = (name: string) => screen.getByRole('link', { name });

test('should add className when focused with tab', () => {
  render(<TestComponent />);

  userEvent.tab();

  const outsideButton = getButton('Outside button');
  expect(outsideButton).toHaveFocus();
  expect(outsideButton).not.toHaveClass(focusClassName);
  expect(outsideButton).not.toHaveAttribute(focusAttributeName);

  userEvent.tab();

  const firstButton = getButton('Button 1');
  expect(firstButton).toHaveFocus();
  expect(firstButton).toHaveClass(focusClassName);
  expect(firstButton).toHaveAttribute(focusAttributeName);

  userEvent.click(firstButton);

  expect(firstButton).toHaveFocus();
  expect(firstButton).not.toHaveClass(focusClassName);
  expect(firstButton).not.toHaveAttribute(focusAttributeName);

  userEvent.tab();

  const focusableText = screen.getByText('Focusable text');
  expect(focusableText).toHaveFocus();
  expect(focusableText).toHaveClass(focusClassName);
  expect(focusableText).toHaveAttribute(focusAttributeName);

  userEvent.tab();

  const secondButton = getButton('Button 2');
  expect(secondButton).toHaveFocus();
  expect(secondButton).toHaveClass(focusClassName);
  expect(secondButton).toHaveAttribute(focusAttributeName);
  expect(firstButton).not.toHaveClass(focusClassName);
  expect(firstButton).not.toHaveAttribute(focusAttributeName);

  userEvent.tab();

  const thirdButton = getButton('Button 3');
  expect(thirdButton).not.toHaveClass(focusClassName);
  expect(thirdButton).not.toHaveAttribute(focusAttributeName);

  const fourthButton = getButton('Button 4');
  expect(fourthButton).toHaveFocus();
  expect(fourthButton).toHaveClass(focusClassName);
  expect(fourthButton).toHaveAttribute(focusAttributeName);
  expect(secondButton).not.toHaveClass(focusClassName);
  expect(secondButton).not.toHaveAttribute(focusAttributeName);

  const firstLink = getLink('Link 1');
  userEvent.click(firstLink);

  expect(firstLink).toHaveFocus();
  expect(firstLink).not.toHaveClass(focusClassName);
  expect(firstLink).not.toHaveAttribute(focusAttributeName);

  userEvent.tab();

  const secondLink = getLink('Link 2');

  expect(secondLink).toHaveFocus();
  expect(secondLink).toHaveClass(focusClassName);
  expect(secondLink).toHaveAttribute(focusAttributeName);

  expect(firstLink).not.toHaveClass(focusClassName);
  expect(firstLink).not.toHaveAttribute(focusAttributeName);
});
