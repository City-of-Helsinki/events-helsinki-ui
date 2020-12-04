import '../../common/translation/i18n/init.client';
import '../../globals';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import PageLayout from './layout/PageLayout';
import ResetFocus from './resetFocus/ResetFocus';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './scrollToTop/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <ResetFocus />
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </>
  );
};

export default App;
