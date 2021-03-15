import React, { FunctionComponent } from 'react';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './pageLayout.module.scss';
const PageLayout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.pageBody}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
