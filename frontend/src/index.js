import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import {store} from './redux/store.js'
export const serverURL = 'https://chat-app-backend-vqd4.onrender.com'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
       <App />
    </Provider>
  </BrowserRouter>
);


