import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './style.css';

import Routes from './routes'
import registerServiceWorker, {unregister} from './registerServiceWorker'
import store from './store'
console.log('public url: ', process.env.PUBLIC_URL)

ReactDOM.render(
    
    <Provider store={store} >  
        <Routes />
    </Provider>, document.getElementById('root'));
    // unregister();
registerServiceWorker();
