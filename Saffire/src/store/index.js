import {createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { reducer as burgerMenu } from 'redux-burger-menu'

import user from './user'
import currentItinerary from '../reducers/reducer_WhereTo'
import currentEvents from '../reducers/currentEvents'



const reducer = combineReducers({user, currentItinerary, burgerMenu, currentEvents })
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user'
