import {createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { reducer as burgerMenu } from 'redux-burger-menu'

import user from './user'
import currentItinerary from '../reducers/reducer_WhereTo'
import currentEvents from '../reducers/currentEvents'
import users from '../reducers/users'
import currentUser from '../reducers/currentUser'
import refresh from '../reducers/refresh'
import connect from '../reducers/connected'
import searchUser from '../reducers/searchUser';
import googleDetails from '../reducers/googleDetails'



const reducer = combineReducers({user, currentItinerary, burgerMenu, currentEvents, users, currentUser, refresh, connect, searchUser, googleDetails })
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user'
