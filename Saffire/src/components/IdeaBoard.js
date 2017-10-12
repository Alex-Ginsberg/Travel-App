import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
import { addEvent, fetchEvents, addToItinerary, confirmEvent, googlePlace, getItineraryMembers, postUserCoordinates } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import Geosuggest from 'react-geosuggest';
import history from '../history';
import BurgerMenu from './Menu';
import NotificationCounter from './NotificationCounter'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';




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
        this.props.getItineraryMembers(this.props.match.params.id)
        this.props.askUserCoor(this.props.match.params.id)
        // If the user is connected to the internet, find the current itinerary in firebase, set it on state, and dispatch to find the events associated with it
        if (this.props.connect) {
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
        this.props.getItineraryMembers(this.props.match.params.id)
    }

     
    onSuggestSelect(suggest) {
        this.props.googleSelect(suggest, this.props.match.params.id)
    }

        
    render() {
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
        console.log('current Events IDEA BOARD', currentEvents)
        const currentUser = this.props.connect ? this.props.currentUser : JSON.parse(window.localStorage.currentUser)
        const isOwner = currentUser.email === itinerary.owner
        const currentMemberEmails = []
        Object.keys(this.props.currentMembers).map(key => {
            currentMemberEmails.push(this.props.currentMembers[key].email)
        })        
        const friendsArr = []
        for (var key in friends) {
            if (currentMemberEmails.indexOf(friends[key].email) === -1){
                friendsArr.push(friends[key])
            }
        }

        const muiTheme = getMuiTheme({
            fontFamily: 'Montserrat',
            // padding: '10px',
            // 'margin-left': 's15px',
        })


        return (
        <div className="idea-board-div" >
            <BurgerMenu />
            <NotificationCounter />
            
            <div className="single-itin-header">
                <BurgerMenu />
                {/* <img className="single-itin-image" src={this.state.itin.imageURL} /> */}
                <h2 className="single-itin-title" >{this.state.itin.name}: IDEABOARD</h2>
                <p className="single-itin-subheader">SELECT ATTRACTIONS TO BUILD YOUR ITINERARY</p>
                <h5 className="single-itin-admin">GROUP ADMIN: {itinerary.owner}</h5>
                <MuiThemeProvider>
                {this.props.currentMembers.map(member => (
                    <List className="ideaBoard-member">
                        <ListItem disabled={true} leftAvatar={<Avatar src={member.image} />} >
                        {member.name}
                        </ListItem>
                    </List>
                ))}
                </MuiThemeProvider>
            </div>

            {/* add friend  */}
            {this.props.connect && <div className = "idea-board-url">
                <form className="idea-itinerary-form" onSubmit={this.addToGroup}>
                    <select name="friends" onChange={(e) => this.setState({currentFriend: e.target.value})}>
                        <option value="" defaultValue>Invite a Friend</option>
                        {friendsArr.map(friend => (
                            <option key={friend.key} value={friend.key}>{friend.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="idea-button">Add</button>
                </form>
            </div>}

            <div className="row">

                <div className="col-lg-6">
                    {/* google places search */}
                    {this.props.connect && <div className = "idea-board-url">
                        <h2 className="idea-board-words">SEARCH WITH GOOGLE PLACES</h2>
                        <Geosuggest onSuggestSelect={this.onSuggestSelect} autoComplete="on"/>
                    </div>}
                </div>


                <div className="col-lg-6">
                    {/* add link */}
                    {this.props.connect && <div className = "idea-board-url">
                        <h2 className="idea-board-words">PASTE LINK TO ATTRACTION</h2>
                        <div>
                            {/* Form for adding a link preview by putting in a URL */}
                            <form onSubmit={handleSubmit} className="idea-itinerary-form">
                                <input className="idea-form-control"
                                    type="url"
                                    onChange={handleChange}
                                    placeholder="Enter a URL"
                                    value={this.state.newURL}/>
                                <button type="submit" className="idea-button" >Enter</button>
                            </form>
                        </div>
                    </div>}
                </div>



            </div>


            


            {/*go to single itin view*/}

            <div className="idea-to-itin">
                <div className="view-itinerary" onClick={() => {history.push(`/itinerary/${this.props.match.params.id}`)}} >VIEW ITINERARY</div>
            </div>



            <div className="row">

                {/*plan idea board*/}
                <div className="col-lg-6">
                    <h4 className="idea-board-words">GROUP SUGGESTIONS</h4>
                    {/* Will render out all events that have not been added yet */}
                    {currentEvents.map(event => (
                        <MuiThemeProvider muiTheme={muiTheme}>
                            {!event.added  &&
                            <div className="idea-board-plan-event" id ={event.key}>

                                <LinkPreview  placeID={event.placeID} eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={this.props.match.params.id} key={this.props.match.params.id}  likes={event.likes} likedBy={event.likedBy} user={currentUser} isOwner={isOwner} comments={event.comments}/>
                            </div>}
                        </MuiThemeProvider>
                    ))}
                </div>

                {/*itinerary board*/}
                <div className="col-lg-6">
                    <h4 className="idea-board-words">ITINERARY</h4>
                    {/* Will render all events that HAVE been added */}
                    {currentEvents.map(event => (
                        <MuiThemeProvider>
                            {event.added && <div className="idea-board-plan-event" key={event.key}><LinkPreview hasBeenAdded={true} placeID={event.placeID} eventKey={event.key} title={event.title} image={event.image} description={event.description} itinKey={itineraryName.key} likes={event.likes} likedBy={event.likedBy} user={currentUser} comments={event.comments}/></div>}
                        </MuiThemeProvider>
                    ))}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


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
        connect: state.connect,
        currentMembers: state.members
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
        }, 
        getItineraryMembers(itinKey) {
            dispatch(getItineraryMembers(itinKey))
        },
        askUserCoor(itinKey) {
            dispatch(postUserCoordinates(itinKey))
        }
    }
}

const IdeaBoardContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
export default IdeaBoardContainer;