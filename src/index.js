import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

// import consolere from 'console-remote-client'     

import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

// consolere.connect({
//   server: 'https://console.re',
//   channel: 'try-817b-6276-47ea',
//   redirectDefaultConsoleToRemote: true,
//   disableDefaultConsoleOutput: true,
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
