import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
import { addEvent, fetchEvents, addToItinerary, confirmEvent, googlePlace } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container} from './DragContainer';
import firebase from 'firebase';
import Geosuggest from 'react-geosuggest';
import history from '../history';



class IdeaBoard extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            newURL: '',
            currentFriend: '',
            itin: {},
            events: []
        }

        this.addToGroup = this.addToGroup.bind(this)
    }
    
    componentDidMount() {
        const currentItinKey = this.props.match.params.id;
        this.props.getItineraryEvents(this.props.match.params.id)
        // If the user is connected to the internet, find the current itinerary in firebase, set it on state, and dispatch to find the events associated with it
        if (this.props.connect) {
            console.log('CONNECTED IN IDEA BOARD')
            const itinRef = firebase.database().ref().child('itineraries').child(currentItinKey)
           
            itinRef.once('value')
                .then(snapshot => {
                    const itin = snapshot.val()
                    let events = []
                    for (let key in itin.events) {
                        events.push(itin.events[key])
                    }
                    this.setState({itin: snapshot.val(), events: events})
                })
        }

        // If the user is not connected to the internet, find the current itinerary in local storage, set it on state, and make an array with all of its events 
        else {
            const allItins = JSON.parse(localStorage.allItineraries)
            let itinToAdd
            let events = []
            console.log('NOT CONNECTED: ', allItins)
            for (let i = 0; i < allItins.length; i++) {
                if (allItins[i].key === currentItinKey) {
                    itinToAdd = allItins[i]
                }
            }
            for (let key in itinToAdd.events) {
                events.push(itinToAdd.events[key])
            }
            this.setState({itin: itinToAdd, events: events})

        }
    }
    
    handleChange(e) {
        let url = e.target.value
        this.setState({
            newURL: url
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendUrl(this.state.newURL, this.props.match.params.id)
    }
    
    addToGroup(e) {
        e.preventDefault()
        this.props.addMember(this.props.match.params.id, this.state.currentFriend)
    }

     
    onSuggestSelect(suggest) {
        console.log('*********', suggest); // eslint-disable-line
        this.props.googleSelect(suggest, this.props.match.params.id)
    }

    /**
     * When there are no suggest results
     * @param {String} userInput The user input
     */
    onSuggestNoResults(userInput) {
        console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
    }
        
    render() {
        console.log("BEGINNING OF RENDER")
        /*
            FIREBASE EVENT LISTENERS
         =========================================================================================================================================================
        */
        //Sets up an event listener that checks for anytime the amount of likes changes 
        //Uses a conditional to also update when an event is added to the 'itinerary' side 
        if (this.props.connect) {
            this.props.currentEvents.map(event => {
                const eventRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id).child('events').child(event.key)
                eventRef.on('child_changed', (data) => {
                    console.log('CHILD CHANGED: ', data.val())
                    const newLikes = data.val()
                    if (typeof newLikes === 'number') {
                        this.props.getItineraryEvents(this.props.match.params.id)
                    }
                    else if (newLikes === true) {
                        this.props.getItineraryEvents(this.props.match.params.id)
                    }
                })
            })
        }


        /*
        =========================================================================================================================================================
            END FIREBASE EVENT LISTNERS
        */

        console.log('idea board', this.state);
        // if (this.props.connect && !this.props.currentEvents.length) {
        //     this.props.getItineraryEvents(this.props.match.params.id)
        // }
      
        let itinerary = this.state.itin;
        let itinImage = itinerary.image;
        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;
        let itineraryName = this.props.connect ? this.props.itineraryName : this.state.itin
        let friends = this.props.connect ? this.props.currentUser.friends : JSON.parse(window.localStorage.currentUser).friends
        const currentEvents = this.props.connect ? this.props.currentEvents : this.state.events
        const currentUser = this.props.connect ? this.props.currentUser : JSON.parse(window.localStorage.currentUser)
        let friendsArr = []
        for (var key in friends) {
            friendsArr.push(friends[key])
        }
        console.log('EVENTS: ', currentEvents)

    
        //     var card = document.getElementById('pac-card');
        //     var input = document.getElementById('pac-input');
        //     var types = document.getElementById('type-selector');
        //     var strictBounds = document.getElementById('strict-bounds-selector');
    
        //     map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    
        //     var autocomplete = new google.maps.places.Autocomplete(input);
            


        
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
        return (
        <div className="idea-board-div" >
            
            <div className="single-itin-header">
                {/* <img className="single-itin-image" src={this.state.itin.imageURL} /> */}
                <h2 className="single-itin-title" >{this.state.itin.name}</h2>
            </div>


            {/* add link */}
            {this.props.connect && <div className = "idea-board-url"> 
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
            </div>}

        

            {/* google places search */}
            {this.props.connect && <div className = "idea-board-url">
                <Geosuggest onSuggestSelect={this.onSuggestSelect} autoComplete="on"/>
            </div>}

            {/*go to single itin view*/}

            <div>
                <div onClick={() => {history.push(`/itinerary/${this.props.match.params.id}`)}}>View Itinerary</div>
            </div>

            {/* add friend  */}
            {this.props.connect && <div className = "idea-board-url">
                <form onSubmit={this.addToGroup}>
                    <select name="friends" onChange={(e) => this.setState({currentFriend: e.target.value})}>
                        <option value="" defaultValue>Invite a friend</option>
                        {friendsArr.map(friend => (
                            <option key={friend.key} value={friend.key}>{friend.name}</option>
                        ))}
                    </select>
                    <button type="submit">Add</button>
                </form>
            </div>}
            

            <div className="row">
                <div className="col-lg-6">
                    <h4 className="idea-board-words">PLAN</h4>
                    {/* Will render out all events that have not been added yet */}
                    {currentEvents.map(event => (
                        <MuiThemeProvider>
                            {!event.added  && <div id ={event.key}><LinkPreview  eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={this.props.match.params.id} key={this.props.match.params.id}  likes={event.likes} likedBy={event.likedBy} user={currentUser}/></div>}
                        </MuiThemeProvider>
                    ))}
                </div>

             

                <div className="col-lg-6">
                    <h4 className="idea-board-words">ITINERARY</h4>
                    {/* Will render all events that HAVE been added */}
                    {currentEvents.map(event => (
                        <MuiThemeProvider>
                            {event.added && <div key={event.key}><LinkPreview hasBeenAdded={true} eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy} user={currentUser}/></div>}
                        </MuiThemeProvider>
                    ))}
                </div>
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
        currentUser: state.currentUser,
        connect: state.connect
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
        googleSelect(suggest, itinID) {
            dispatch(googlePlace(suggest, itinID))
        }
    }
}

const IdeaBoardContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
export default IdeaBoardContainer;