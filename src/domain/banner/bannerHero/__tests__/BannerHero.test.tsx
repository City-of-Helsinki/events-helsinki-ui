import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import * as React from 'react';

import { BannerPageFieldsFragment } from '../../../../generated/graphql';
import {
  fakeBanner,
  fakeCmsImage,
  fakeLocalizedCmsImage,
  fakeLocalizedObject,
} from '../../../../test/mockDataUtils';
import BannerHero, { getTestIds } from '../BannerHero';
const title = 'Banner title';
const description = 'Banner page description';
const buttonText = 'Button text';
const photographerCredit = 'Valo Valokuvaaja';
const banner = fakeBanner({
  buttonText: { fi: buttonText },
  description: { fi: description },
  title: { fi: title },
  heroBackgroundImage: fakeLocalizedCmsImage({
    fi: fakeCmsImage({
      photographerCredit: fakeLocalizedObject(photographerCredit),
    }),
  }),
}) as BannerPageFieldsFragment;

test('should be rendered correctly', () => {
  render(
    <BannerHero
      banner={{ ...banner, titleAndDescriptionColor: { fi: 'WHITE' } }}
      location="top"
    />
  );

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByText(buttonText)).toBeInTheDocument();

  const creditsContainer = screen.queryByText(`Kuva: ${photographerCredit}`);
  expect(creditsContainer).toBeInTheDocument();
  expect(creditsContainer).toHaveStyle('background-color: rgba(0, 0, 0, 0.7)');
});

test('should set text wrapper background color and background images', () => {
  render(
    <BannerHero
      banner={{
        ...banner,
        titleAndDescriptionColor: { fi: 'WHITE' },
      }}
      location="top"
    />
  );
  const testIds = getTestIds('top');
  expect(screen.getByTestId(testIds.content) as HTMLDivElement).toHaveStyle({
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  });
  expect(
    screen.getByTestId(testIds.desktopBackgroundImage)
  ).toBeInTheDocument();
  expect(screen.getByTestId(testIds.mobileBackgroundImage)).toBeInTheDocument();
  expect(screen.getByTestId(testIds.heroTopLayerImage)).toBeInTheDocument();
});

test('should set different toplayer image position for top and bottom banner', () => {
  render(
    <>
      <BannerHero banner={banner} location="top" />
      <BannerHero banner={banner} location="bottom" />
    </>
  );

  expect(
    screen.getByTestId(getTestIds('top').heroTopLayerImage) as HTMLDivElement
  ).toHaveStyle({
    backgroundColor: '`center calc(100% - 5.5rem)',
  });
  expect(
    screen.getByTestId(getTestIds('bottom').heroTopLayerImage) as HTMLDivElement
  ).toHaveStyle({
    backgroundColor: '`center calc(100% - 0rem)',
  });
});

test('should open buttonUrl', () => {
  global.open = jest.fn();
  render(<BannerHero banner={banner} location="top" />);

  userEvent.click(screen.getByRole('button', { name: buttonText }));
  expect(global.open).toBeCalled();
});

test('Banner should be accessible', async () => {
  const { container } = render(<BannerHero banner={banner} />);
  expect(await axe(container)).toHaveNoViolations();
});
