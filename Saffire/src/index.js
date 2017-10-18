import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './style.css';

import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    
    <Provider store={store} >  
        <Routes />
    </Provider>, document.getElementById('root'))
registerServiceWorker()
