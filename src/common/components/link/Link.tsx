import classNames from 'classnames';
import { IconAngleRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import SrOnly from '../srOnly/SrOnly';
import styles from './link.module.scss';

interface Props extends LinkProps {
  color?: 'default' | 'white';
  isExternal?: boolean;
  size?: 'default' | 'small';
  to: string;
}

const Link: React.FC<Props> = ({
  className,
  color = 'default',
  children,
  isExternal = false,
  size = 'default',
  to,
  ...rest
}) => {
  const commonProps = {
    className: classNames(
      styles.link,
      styles[`${color}Color`],
      styles[`${size}Size`],
      className
    ),
  };
  const { t } = useTranslation();
  return isExternal ? (
    <a href={to} rel="noopener noreferrer" target="_blank" {...commonProps}>
      {children}
      <SrOnly>{t('commons.srOnly.opensInANewTab')}</SrOnly>
      <IconAngleRight aria-hidden />
    </a>
  ) : (
    <RouterLink to={to} {...commonProps} {...rest}>
      {children}
      <IconAngleRight aria-hidden />
    </RouterLink>
  );
};

export default Link;
