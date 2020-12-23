import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { BannerPageFieldsFragment } from '../../../../generated/graphql';
import { fakeBanner } from '../../../../util/mockDataUtils';
import BannerHero, { testIds } from '../BannerHero';

const title = 'Banner title';
const description = 'Banner page description';
const buttonText = 'Button text';
const banner = fakeBanner({
  buttonText: { fi: buttonText },
  description: { fi: description },
  title: { fi: title },
}) as BannerPageFieldsFragment;

test('should be rendered correctly', () => {
  render(<BannerHero banner={banner} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByText(buttonText)).toBeInTheDocument();
});

test('should set text wrapper max-width', () => {
  render(<BannerHero banner={banner} />);

  expect(screen.getByTestId(testIds.content).style.maxWidth).toMatch(
    /(43[7-9])|(44[0-2])px/
  );
  expect(screen.getByTestId(testIds.content)).toHaveStyle({
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  });
});

test('should set text wrapper max-width when innerWidth = 1000', () => {
  global.innerWidth = 1000;
  render(
    <BannerHero
      banner={{
        ...banner,
        titleAndDescriptionColor: { fi: 'WHITE' },
      }}
    />
  );
  expect(screen.getByTestId(testIds.content).style.maxWidth).toMatch(
    /28[3-9]px/
  );
});

test('should set text wrapper background color', () => {
  render(
    <BannerHero
      banner={{
        ...banner,
        titleAndDescriptionColor: { fi: 'WHITE' },
      }}
    />
  );

  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toHaveStyle({
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  });
});

test('should open buttonUrl', () => {
  global.open = jest.fn();
  render(<BannerHero banner={banner} />);

  userEvent.click(screen.getByRole('button', { name: buttonText }));
  expect(global.open).toBeCalled();
});
