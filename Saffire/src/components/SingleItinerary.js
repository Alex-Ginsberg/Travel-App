import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from '../firebase'
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import {setDateAndTime} from '../actions'




class SingleItinerary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            itin: {},
            showForm: {},
            currentTime: '',
            currentDate: ''
        }
        this.renderForm = this.renderForm.bind(this)
        this.submitEvent = this.submitEvent.bind(this)
    }

    componentDidMount() {
        const itinRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id)
        itinRef.once('value')
            .then(snapshot => {
                this.setState({itin: snapshot.val()})
            })
    }

    renderForm(event) {
        this.setState({showForm: event})
    }

    submitEvent() {
        this.props.setDateAndTime(this.props.match.params.id, this.state.showForm, this.state.currentDate, this.state.currentTime)
    }

    render() {
        let events = []
        let eventScheduled = []
        console.log(this.state)
        for (let key in this.state.itin.events) {
            if (this.state.itin.events[key].added && !this.state.itin.events[key].schedule){events.push(this.state.itin.events[key])}
            else if (this.state.itin.events[key].schedule){eventScheduled.push(this.state.itin.events[key])}
        }
        console.log(events)
        return (
            <div>
                <h4>Events to be added to timeline: </h4>
                {events.map(event => (
                    <div key={event.url}>
                        <h5 onClick={() => {this.renderForm(event)}}>{event.title}</h5>
                        <p>People going to this event: </p>
                        {event.likedBy && Object.keys(event.likedBy).map(likeByKey => (
                            <p key={likeByKey}>{event.likedBy[likeByKey].name}</p>
                        ))}
                    </div>
                ))}
                <h4>Events scheduled:</h4>
                {eventScheduled.map(event => (
                    <div key={event.url}>
                        <h3>{event.title}</h3>
                        <h5>{event.schedule.date}</h5>
                        <h5>{event.schedule.time}</h5>
                    </div>
                ))}
                {this.state.showForm.title && 
                    <div>
                        <p>Form</p>
                        <p>{this.state.showForm.title}</p>
                        <MuiThemeProvider>
                            <DatePicker 
                            hintText="Select a Date" 
                            value={this.state.currentDate}
                            onChange={(nade, data) => this.setState({currentDate: data})}/>
                            <TimePicker 
                            hintText="Select a Time" 
                            value={this.state.currentTime}
                            onChange={(nada, data) => this.setState({currentTime: data})}/>
                        </MuiThemeProvider>
                        <button onClick={this.submitEvent}>Submit event</button>
                    </div>
                }
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
        setDateAndTime(itinId, event, date, time) {
            dispatch(setDateAndTime(itinId, event, date, time))
        }
    }
}

const SingleItineraryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItinerary);
export default SingleItineraryContainer;