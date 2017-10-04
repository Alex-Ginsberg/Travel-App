import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
import { postItinerary, getCurrentUser } from '../actions';


class WhereTo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newItinerary: '',
            dirtyItinerary: false
        }

    }

    componentDidMount() {
        // this.props.getCurrentUser() 
    }

    handleSubmit(e) {
        e.preventDefault()
        let newItinerary = this.state.newItinerary
        this.props.setItineraryName(newItinerary) 
    }

    

    render() {

        let handleSubmit = this.handleSubmit;
        return (

            <div className="sapphire-itinerary-div">
                <form onSubmit={handleSubmit} className="sapphire-itinerary-form">
                    
                    <label id = "home-page-label">Start Your Adventure</label>
                    <input name="itineraryName" 
                        type="text" 
                        className="form-control" 
                        placeholder="Itinerary Name"
                        onChange={(e) => {this.setState({newItinerary: e.target.value, dirtyItinerary: true})}}/>
                    
                    {(this.state.dirtyItinerary && !this.state.newItinerary.length) && <p className="errorItinerary alert alert-danger" >please enter an itinerary name</p>}

                    <button type="submit" className="btn btn-primary">Go</button>
                </form>
                {/* <span>{this.props.itineraryName}</span> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
  
        setItineraryName(itineraryName) {
            dispatch(postItinerary(itineraryName))
        },
        getCurrentUser() {
            dispatch(getCurrentUser())
    }
  }
}

const WhereToContainer = connect(mapStateToProps, mapDispatchToProps)(WhereTo);
export default WhereToContainer;