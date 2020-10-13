import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useMobileMenuContext } from '../header/mobileMenu/MobileMenu';
import SkipLink from '../skipLink/SkipLink';
import styles from './pageLayout.module.scss';

const PageLayout: FunctionComponent = ({ children }) => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  return (
    <div
      className={classNames(styles.pageLayout, {
        [styles.mobileMenuOpen]: isMobileMenuOpen,
      })}
    >
      <SkipLink />
      <Header />

      <div className={styles.pageBody}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
