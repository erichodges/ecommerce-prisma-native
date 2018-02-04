import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Products from './Products';

export default () => (
    <NativeRouter>        
        <Switch>        
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Route exact path="/Products" component={Products} />            
        </Switch>        
    </NativeRouter>
);