import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import firebase from 'firebase/app';
import firebaseConfig from './api/apiKeys';
import Initialize from './Initialize';

import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <Initialize />
  </Router>,
  document.getElementById('root'),
);
