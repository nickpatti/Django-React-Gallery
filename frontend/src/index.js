import {Home} from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';


const e = React.createElement


const homeView = document.getElementById("home")
if (homeView) {
    ReactDOM.render(
        e(Home, homeView.dataset), homeView)
}
