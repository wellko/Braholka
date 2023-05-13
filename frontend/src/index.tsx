import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GOOGLE_CLIENT_ID } from './constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense fallback={<CircularProgress />}>
            <App />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
);
