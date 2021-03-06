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
import searchUser from '../reducers/searchUser'
import currentCoordinates from '../reducers/reducer_Coor'
import locationList from '../reducers/reducer_Location'
import members from '../reducers/members'

import googleDetails from '../reducers/googleDetails'


const reducer = combineReducers({user, currentItinerary, burgerMenu, currentEvents, users, currentUser, refresh, connect, searchUser, currentCoordinates, googleDetails, members, locationList })
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user'
