import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'tw-elements';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
     domain={process.env.REACT_APP_DOMAIN as string}
     clientId={process.env.REACT_APP_CLIENT_ID as string}
     redirectUri={window.location.origin}>
      <Router>
        <App/>
      </Router>
    </Auth0Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
