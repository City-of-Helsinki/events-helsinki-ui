import { Koros } from 'hds-react';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import isTestEnv from '../../../util/isTestEnv';
import styles from './staticPageHero.module.scss';

const StaticPageHero: React.FC = ({ children }) => {
  return (
    <>
      <div className={styles.staticPageHero}>
        <Container>{children}</Container>
      </div>

      {!isTestEnv && (
        /* istanbul ignore next */
        <Koros className={styles.koros} flipHorizontal={true} type="basic" />
      )}
    </>
  );
};

export default StaticPageHero;
