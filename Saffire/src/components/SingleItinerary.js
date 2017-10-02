import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
//import { postIdea } from '../actions';

const SingleItinerary = (props) => {
    
    return (
        <h1>SingleItinerary component here</h1>
    )
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const SingleItineraryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItinerary);
export default SingleItineraryContainer;