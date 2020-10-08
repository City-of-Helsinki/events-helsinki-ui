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
    <div className={styles.pageLayout}>
      <SkipLink />
      <Header />

      <div
        aria-hidden={isMobileMenuOpen}
        className={classNames(styles.pageBody, {
          [styles.mobileMenuOpen]: isMobileMenuOpen,
        })}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
