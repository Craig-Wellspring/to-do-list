import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import firebase from 'firebase/app';
import firebaseConfig from './api/apiKeys';
import Initialize from './Initialize';

import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<Initialize />, document.getElementById('root'));
