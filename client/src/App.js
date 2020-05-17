import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

//Screens
import HomeScreen from './components/HomeScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import EditLogoScreen from './components/EditLogoScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import NavBar from './components/NavBar';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <div className="container">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/view/:id" component={ViewLogoScreen} />
          <Route path="/edit/:id" component={EditLogoScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
