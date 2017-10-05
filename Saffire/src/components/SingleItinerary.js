import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MapComp} from '../components'
import firebase from '../firebase'
//import Navbar from './navbar';
//import { postIdea } from '../actions';

const SingleItinerary = (props) => {
    console.log('params', props.match.params)

    return (
        <MapComp itinKey = {props.match.params}/>
    )
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        user: state.currentUser,
        currentItin: state.currentItinerary

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const SingleItineraryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItinerary);
export default SingleItineraryContainer;