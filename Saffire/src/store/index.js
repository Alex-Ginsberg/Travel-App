import {createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user'
import currentItinerary from '../reducers/reducer_WhereTo'
import currentEvents from '../reducers/currentEvents'


const reducer = combineReducers({user, currentItinerary, currentEvents})
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user'
