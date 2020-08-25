import { Koros } from 'hds-react';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import isTestEnv from '../../../util/isTestEnv';
import styles from './hero.module.scss';

const NotFound: React.FC = ({ children }) => {
  return (
    <>
      <div className={styles.hero}>
        <Container>{children}</Container>
      </div>

      {!isTestEnv && (
        /* istanbul ignore next */
        <Koros className={styles.koros} flipHorizontal={true} type="basic" />
      )}
    </>
  );
};

export default NotFound;
