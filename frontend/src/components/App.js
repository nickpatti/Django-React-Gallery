import React, { useEffect, useState, Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from '../store';
import Login from "../accounts/Login";
import { loadUser } from '../actions/auth';

import Header from '../layout/Header';
import HomePage from '../home/Home';
import Album from '../gallery/Album';


const alertOptions = {
    timeout: 3000,
    position: 'top center'
}


export class Home extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return(
            <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/gallery/" component={Album} />
                    <Route exact path="/login/" component={Login} />
                </Switch>
            </Fragment>
            </Router>
            </AlertProvider>
            </Provider>
        )
    }
}
