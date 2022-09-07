import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/vars.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Router basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);

reportWebVitals();
