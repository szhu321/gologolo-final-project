import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

//Screens
import HomeScreen from './components/HomeScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import EditLogoScreen from './components/EditLogoScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import NavBar from './components/NavBar';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <div className = "container">
        <Route exact path = "/" component = {HomeScreen}/>
        <Route path = "/view/:id" component = {ViewLogoScreen}/>
        <Route path = "/edit/:id" component = {EditLogoScreen}/>
        <Route path = "/login" component = {LoginScreen}/>
        <Route path = "/register" component = {RegisterScreen}/>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
