import {createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user'
import currentItinerary from '../reducers/reducer_WhereTo'


const reducer = combineReducers({user, currentItinerary})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user'
