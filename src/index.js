import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main_container/App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './services/Reducers/rootReducer'
import Thunk from "redux-thunk";
import {HashRouter, BrowserRouter as Router} from 'react-router-dom'
const store = createStore(rootReducer,applyMiddleware(Thunk));
// console.warn(store)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
