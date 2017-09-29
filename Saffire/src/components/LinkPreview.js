import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
//import { postIdea } from '../actions';


const LinkPreview = (props) => {
    
    return (
        <h1>LinkPreview component here</h1>
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

const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
export default LinkPreviewContainer;