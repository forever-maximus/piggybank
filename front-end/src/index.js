import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './font-awesome-4.7.0/css/font-awesome.min.css';

ReactDOM.render((
  <Router>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
