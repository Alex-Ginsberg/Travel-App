import {createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user'
import WhereTo from '../reducers/reducer_WhereTo'


const reducer = combineReducers({user, WhereTo})
// const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer)

export default store
export * from './user'
