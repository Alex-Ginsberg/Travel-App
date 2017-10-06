import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
import { addEvent, fetchEvents, addToItinerary, confirmEvent } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container} from './DragContainer';
import firebase from 'firebase';


class IdeaBoard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newURL: '',
            currentFriend: '',
            itin: {},
        }
        this.addToGroup = this.addToGroup.bind(this)
    }
    
    componentDidMount() {
        const currentItinKey = this.props.match.params.id;
        const itinRef = firebase.database().ref().child('itineraries').child(currentItinKey)
        itinRef.once('value')
            .then(snapshot => {
                this.setState({itin: snapshot.val()})
            })
        
        this.props.getItineraryEvents(currentItinKey)
    }
    
    handleChange(e) {
        let url = e.target.value
        this.setState({
            newURL: url
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendUrl(this.state.newURL, this.props.match.params.id)
    }
    
    addToGroup(e) {
        e.preventDefault()
        this.props.addMember(this.props.match.params.id, this.state.currentFriend)
    }
    
    render() {
        /*
            FIREBASE EVENT LISTENERS
        */
        //Sets up an event listener that checks for anytime the amount of likes changes 
        this.props.currentEvents.map(event => {
            const eventRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id).child('events').child(event.key)
            eventRef.on('child_changed', (data) => {
                console.log('CHILD CHANGED: ', data.val())
                const newLikes = data.val()
                if (typeof newLikes === 'number') {
                    console.log('LLLIIIESSS')
                    this.props.getItineraryEvents(this.props.match.params.id)
                }
                else if (newLikes === true) {
                    this.props.getItineraryEvents(this.props.match.params.id)
                }
            })
        })

        console.log('idea board', this.props.currentEvents);
        let itinerary = this.state.itin;
        let itinImage = itinerary.image;
    

        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;
        let itineraryName = this.props.itineraryName
        let friends = this.props.currentUser.friends
        let friendsArr = []
        for (var key in friends) {
            friendsArr.push(friends[key])
        }
        
        // function drag(event, eventId, itineraryKey) {
        //     var obj = {
        //         id: event.target.id,
        //         eventId: eventId,
        //         itineraryKey: itineraryKey
        //     }
        //     var finalObj = JSON.stringify(obj);
        //     event.dataTransfer.setData("text", finalObj);
        // }
        
        // function drop(event, props) {
        //     event.preventDefault();
            
        //     var data = JSON.parse(event.dataTransfer.getData("text")).id;
        //     var eventId = JSON.parse(event.dataTransfer.getData("text")).eventId;
        //     var itineraryKey = JSON.parse(event.dataTransfer.getData("text")).itineraryKey;
        //     props.confirmEvent(eventId, itineraryKey);
        //     event.target.appendChild(document.getElementById(data));
        // }
        
        
        // function allowDrop(event, props) {
        //     event.preventDefault();
        // }
        
        //starts at top of page
        // window.scrollTo(0,0);
       console.log('*******', this.props.currentEvents);

        return (
        <div className="idea-board-div" >
            
            <div className="single-itin-header">
                {/* <img className="single-itin-image" src={this.state.itin.imageURL} /> */}
                <h2 className="single-itin-title" >{this.state.itin.name}</h2>
            </div>


            <div className = "idea-board-url"> 
                <p className="idea-board-words">DROP YOUR LINKS</p>
                <div>
                    {/* Form for adding a link preview by putting in a URL */}
                    <form onSubmit={handleSubmit} className="itinerary-form">
                        <input className="urlForm" 
                            type="url" 
                            onChange={handleChange}
                            placeholder="Enter a URL"
                            value={this.state.newURL}/>                       
                        <button type="submit" className="">Enter</button>
                    </form>
                </div>
            </div>


            <div className = "idea-board-url">
                <form onSubmit={this.addToGroup}>
                    <select name="friends" onChange={(e) => this.setState({currentFriend: e.target.value})}>
                        <option value="" defaultValue>Invite a friend</option>
                        {friendsArr.map(friend => (
                            <option key={friend.key} value={friend.key}>{friend.name}</option>
                        ))}
                    </select>
                    <button type="submit">Add</button>
                </form>
            </div>
            

            <div className="row">
                <div className="col-6">
                    <h4 className="idea-board-words">PLAN</h4>
                    {/* Will render out all events that have not been added yet */}
                    {this.props.currentEvents.map(event => (
                        <MuiThemeProvider>
                            {!event.added  && <div id ={event.key}><LinkPreview  eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={this.props.match.params.id} likes={event.likes} likedBy={event.likedBy}/></div>}
                        </MuiThemeProvider>
                    ))}
                </div>

             

                <div className="col-6">
                    <h4 className="idea-board-words">ITINERARY</h4>
                    {/* Will render all events that HAVE been added */}
                    {this.props.currentEvents.map(event => (
                        <MuiThemeProvider>
                            {event.added && <div><LinkPreview hasBeenAdded={true} eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy}/></div>}
                        </MuiThemeProvider>
                    ))}
                </div>
            </div>


            <div>
                {/* <p>Left arrow: <i className="arrow left"></i></p>
                <p>Right arrow: <i className="arrow right"></i></p>
                <div onDragOver= {(event) => {allowDrop(event)}} className = "sapphire-event-box" onDrop={(event) => drop(event,this.props)}></div> */}
            </div>

                    

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        itineraryImage: state.currentItinerary.imageURL,
        currentEvents: state.currentEvents,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItineraryEvents(itinKey) {
            dispatch(fetchEvents(itinKey))
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