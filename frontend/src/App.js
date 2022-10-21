import React, { Component } from 'react';
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import './App.css';

import {HashRouter,  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore } from 'redux';

import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";

import AppStore from './appStore';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(AppStore.reducer)}>
                <HashRouter>
                    <Switch>
                        <Route path='/' exact={true} component={ClientList}/>
                        <Route path='/clients/:id' exact={true} component={ClientEdit}/>

                    </Switch>
                </HashRouter>
            </Provider>
    )
    }
}

export default App;