import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { LandingPageFieldsFragment } from '../../../../generated/graphql';
import { fakeLandingPage } from '../../../../util/mockDataUtils';
import LandingPageHero, { testIds } from '../LandingPageHero';

const title = 'Landing page title';
const description = 'Landing page description';
const buttonText = 'Button text';
const landingPage = fakeLandingPage({
  buttonText: { fi: buttonText },
  description: { fi: description },
  title: { fi: title },
}) as LandingPageFieldsFragment;

test('should be rendered correctly', () => {
  render(<LandingPageHero landingPage={landingPage} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByText(buttonText)).toBeInTheDocument();
});

test('should set text wrapper max-width', () => {
  render(<LandingPageHero landingPage={landingPage} />);

  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toHaveStyle({
    maxWidth: '520px',
  });
  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toHaveStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  });
});

test('should set text wrapper max-width', () => {
  global.innerWidth = 1000;
  render(
    <LandingPageHero
      landingPage={{
        ...landingPage,
        titleAndDescriptionColor: { fi: 'WHITE' },
      }}
    />
  );

  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toHaveStyle({
    maxWidth: '340px',
  });
});

test('should set text wrapper background color', () => {
  render(
    <LandingPageHero
      landingPage={{
        ...landingPage,
        titleAndDescriptionColor: { fi: 'WHITE' },
      }}
    />
  );

  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toBe({
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  });
});

test('should open buttonUrl', () => {
  global.open = jest.fn();
  render(<LandingPageHero landingPage={landingPage} />);

  userEvent.click(screen.getByRole('button', { name: buttonText }));
  expect(global.open).toBeCalled();
});
