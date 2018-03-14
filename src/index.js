import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CartoGrapher from './components/cartographer/cartographer';
import Master from './components/layout/master';
ReactDOM.render(
  <Router>
    <Master />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
