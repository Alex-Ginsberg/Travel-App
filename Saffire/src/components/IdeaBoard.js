import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
import { addEvent, fetchEvents, addToItinerary, confirmEvent } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class IdeaBoard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newURL: '',
            currentFriend: ''
        }
        this.addToGroup = this.addToGroup.bind(this)
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

    addToGroup(e) {
        e.preventDefault()
        this.props.addMember(this.props.itineraryName.key, this.state.currentFriend)
    }

    render() {
        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;
        let itineraryName = this.props.itineraryName
        let friends = this.props.currentUser.friends
        let friendsArr = []
        for (var key in friends) {
            friendsArr.push(friends[key])
        }
      
          function drag(event, eventId, itineraryKey) {
            var obj = {
                id: event.target.id,
                eventId: eventId,
                itineraryKey: itineraryKey
            }
            var finalObj = JSON.stringify(obj);
            event.dataTransfer.setData("text", finalObj);
          }
          
          function drop(event, props) {
            event.preventDefault();
            
            var data = JSON.parse(event.dataTransfer.getData("text")).id;
            var eventId = JSON.parse(event.dataTransfer.getData("text")).eventId;
            var itineraryKey = JSON.parse(event.dataTransfer.getData("text")).itineraryKey;
            props.confirmEvent(eventId, itineraryKey);
            event.target.appendChild(document.getElementById(data));
          }
      
          function allowDrop(event, props) {
            event.preventDefault();
          }
        
        return (
        <div>
            <h2>{itineraryName.name}</h2>
            <form className="form-control" onSubmit={this.addToGroup}>
                <select className="form-control" name="friends" onChange={(e) => this.setState({currentFriend: e.target.value})}>
                    <option value="" defaultValue>Select a friend to add</option>
                    {friendsArr.map(friend => (
                        <option key={friend.key} value={friend.key}>{friend.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
            <h3>Put your ideas here!</h3>
            <div className="form-group">
                {/* Form for adding a link preview by putting in a URL */}
                <form onSubmit={handleSubmit} className="itinerary-form">
                    <input className="urlForm" 
                        type="url" 
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter a URL"
                        value={this.state.newURL}/>                       
                    <button type="submit" className="btn btn-primary">Enter</button>
                </form>
            <div>
                <h1>Vote!</h1>
                {/* Will render out all events that have not been added yet */}
                {this.props.currentEvents.map(event => (
                    <MuiThemeProvider>
                        {!event.added  && <div id ={event.key} onDragStart = {(ev) => drag(ev, event.key, itineraryName.key)} draggable = "true"><LinkPreview  eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy}/></div>}
                    </MuiThemeProvider>
                ))}
            </div>
            <div>
                <h1>Added!</h1>
                {/* Will render all events that HAVE been added */}
                {this.props.currentEvents.map(event => (
                    <MuiThemeProvider>
                        {event.added && <div><LinkPreview hasBeenAdded={true} eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy}/></div>}
                    </MuiThemeProvider>
                ))}
            </div>

            </div>
            <p>Left arrow: <i className="arrow left"></i></p>
            <p>Right arrow: <i className="arrow right"></i></p>

            <div onDragOver= {(event) => {allowDrop(event)}} className = "sapphire-event-box" onDrop={(event) => drop(event,this.props)}>

            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        currentEvents: state.currentEvents,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItineraryEvents(itin) {
            dispatch(fetchEvents(itin))
        },
        sendUrl(url, itin) {
            dispatch(addEvent(url, itin))
        },
        addMember(itin, user) {
            dispatch(addToItinerary(itin, user))
        },
        confirmEvent(eventId, itinKey) {
            dispatch(confirmEvent(eventId, itinKey))
        },
    }
}

const IdeaBoardContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
export default IdeaBoardContainer;