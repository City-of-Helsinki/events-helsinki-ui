import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './pageLayout.module.scss';

const PageLayout: FunctionComponent = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <Header menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <div aria-hidden={menuOpen} className={styles.pageBody}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
