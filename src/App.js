import React from 'react';

import { Switch, Route } from 'react-router-dom'

import Home from './pages/homepage/Home';
import CategoryPage from './pages/Categorypage/CategoryPage';
import Storefront from './pages/Storefront/Storefront';

import Login from './pages/Profile/Login';
import CreateAccount from './pages/Profile/CreateAccount';
import Profile from './pages/Profile/Profile';


export default function App(props) {
  return (

    <Switch>

      <Route exact path = '/' component = {Home} />

      
      <Route exact path = '/category/:category' component = {CategoryPage} />
      
      <Route exact path = '/store/:webpath' component = {Storefront} />



      <Route exact path = '/login' component = {Login} />
      <Route exact path = '/createaccount' component = {CreateAccount} />
      <Route exact path = '/profile' component = {Profile} />
    </Switch>

  );
}
