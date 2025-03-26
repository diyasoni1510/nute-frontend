import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import store from "./pages/redux/store";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="804328762528-806oa3kpc9mahkcvi3cafirqnl45tcb4.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
