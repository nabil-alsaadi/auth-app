import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {persistor, store} from './redux/store';

import "./ReactotronConfig"
import { PersistGate } from 'redux-persist/integration/react';
import { removeToken, setToken } from './services/authService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const updateAxiosToken = () => {
  const state = store.getState();
  const token = state.user.token; 
  console.log('updateAxiosToken',token)
  if (token) {
    setToken(token)
  } else {
    removeToken()
  }
};

store.subscribe(updateAxiosToken);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
