import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css';

import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

import {Main} from './components'

ReactDOM.render(
    <Provider store={store} >  
        <Routes />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
