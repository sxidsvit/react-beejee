import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { ApiData } from './context/Api/ApiData'
import { AlertState } from './context/Alert/AlertState'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ApiData>
      <AlertState>
        <App />
      </AlertState>
    </ApiData>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
