import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
import { setItinerary } from '../actions';


class WhereTo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newItinerary: '',
            dirtyItinerary: false
        }
    }


    handleSubmit(e) {
        e.preventDefault()
        const { itineraryName } = e.target
        const name = itineraryName.value
        this.props.setItineraryName(name)   
        console.log('props', this.props)
    }
    

    render() {
        let handleSubmit = this.handleSubmit;
        console.log('props2', this.props)
        return (
            <div className="form-group">
                <form onSubmit={handleSubmit} className="itinerary-form">
    
                    {/* {
                        this.state.dirtyItinerary && !this.state.newItinerary.length ? 
                        <p className="errorItinerary alert alert-danger" >please enter an itinerary name</p> :
                        <p></p>
                    } */}
                    
                    <input name="itineraryName" 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Your Itinerary Name"/>

                    <button type="submit" className="btn btn-primary">Enter</button>
                </form>
                <span>{this.props.itineraryName}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setItineraryName: itineraryName => dispatch(setItinerary(itineraryName))
    }
}

const WhereToContainer = connect(mapStateToProps, mapDispatchToProps)(WhereTo);
export default WhereToContainer;