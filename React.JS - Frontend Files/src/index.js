import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MetaMask from './components/web3warning/web3warning';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';



import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import userReducer from './store/reducers/userReducer'
import contractReducer from './store/reducers/contractReducer';

 const rootReducer=combineReducers({
    user:userReducer,
    contract:contractReducer,
 });

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


let app;
  if(window.web3 == undefined){
    app=(<MetaMask />);
  }else if(window.web3 != undefined){
    app=(<App />);    
  }




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
          {app}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
