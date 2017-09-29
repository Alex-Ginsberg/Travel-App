import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
import { addEvent, fetchEvents } from '../actions';


class IdeaBoard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newURL: '',
            
        }
    }

    componentDidMount() {
        this.props.getItineraryEvents(this.props.itineraryName)
    }

    handleChange(e) {
        let url = e.target.value
        this.setState({
            newURL: url
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendUrl(this.state.newURL, this.props.itineraryName)
    }
    

    render() {
        console.log('CURRENT ITIN: ', this.props.itineraryName)
        console.log('EVENTS: ', this.props.currentEvents)
        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;
        let itineraryName = this.props.itineraryName
        return (
        <div>
            <h2>Title of Itinerary</h2>
            <h3>Put your ideas here!</h3>
            <div className="form-group">
                <form onSubmit={handleSubmit} className="itinerary-form">
                    <input className="urlForm" 
                        type="url" 
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter a URL"
                        value={this.state.newURL}/>
                        
                    <button type="submit" className="btn btn-primary">Enter</button>
                </form>
            <LinkPreview />
            <div>
                {this.props.currentEvents.map(event => (
                    <div key={event.title}>
                        <p>Title: {event.title}</p>
                        <p>Description: {event.description}</p>
                        <img src={event.image} />
                    </div>
                ))}
            </div>

            </div>
            <p>Left arrow: <i className="arrow left"></i></p>
            <p>Right arrow: <i className="arrow right"></i></p>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        currentEvents: state.currentEvents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItineraryEvents(itin) {
            dispatch(fetchEvents(itin))
        },
        sendUrl(url, itin) {
            dispatch(addEvent(url, itin))
        }
    }
}

const IdeaBoardContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
export default IdeaBoardContainer;