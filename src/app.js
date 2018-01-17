import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login,logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';

import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import {firebase} from './firebase/firebase';

const store = configureStore();

const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log('state.expenses',state.expenses,'state.filters',state.filters, 'visibleExpenses',visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered=false;
const renderApp=()=>{
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user=>{
  if(user) {
    store.dispatch(login(user));
    console.log('USER',user);
    store.dispatch(startSetExpenses())
    .then(()=>{
      renderApp();
      if(history.location.pathname==='/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    console.log('logged out!');
    renderApp();
    history.push('/');
  }
});