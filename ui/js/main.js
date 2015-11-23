import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

require('../styles/main.scss');

ReactDOM.render(
  <App />,
  document.getElementById('tunetab')
);
