import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import { MsalProvider } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';
import { CustomNavigationClient } from './utils/NavigationClient';

import { PageLayout } from './components/PageLayout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

type AppProps = {
  pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <PageLayout>
        <Pages />
      </PageLayout>
    </MsalProvider>
  );
}

function Pages() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
