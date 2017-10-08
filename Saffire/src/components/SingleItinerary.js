import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from '../firebase'
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import {setDateAndTime, sendMessage, fetchUsers} from '../actions'
import BurgerMenu from './Menu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {MapComp} from '../components'
import schedule from 'node-schedule'

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
  } from 'material-ui/styles/colors';


class SingleItinerary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            itin: {},
            showForm: {},
            currentTime: '',
            currentDate: '',
            showChat: false,
            chatMessage: '', 
            events: []
        }
        this.renderForm = this.renderForm.bind(this)
        this.submitEvent = this.submitEvent.bind(this)
        this.sendChat = this.sendChat.bind(this)
}

    componentDidMount() {
        const currentItinKey = this.props.match.params.id;
        // If the user is connected to the internet, find the current itinerary in firebase, set it on state, and dispatch to find the events associated with it
        if (this.props.connect) {
            const itinRef = firebase.database().ref().child('itineraries').child(currentItinKey)
            itinRef.once('value')
                .then(snapshot => {
                    this.setState({itin: snapshot.val()})
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

    renderForm(event) {
        if(!this.state.showForm.title){this.setState({showForm: event})}
        else {this.setState({showForm: {}})}
    }

    submitEvent(e) {
        e.preventDefault()
        console.log('HOURS: ', typeof(this.state.currentTime.getHours() - 1))
        const toSchedule = new Date(
            this.state.currentDate.getFullYear(),
            this.state.currentDate.getMonth(),
            this.state.currentDate.getDate(),
            this.state.currentTime.getHours() - 1,
            this.state.currentTime.getMinutes(),
            this.state.currentTime.getSeconds(),
            this.state.currentTime.getMilliseconds()
        )
        schedule.scheduleJob(toSchedule, () => {
            console.log('WORRRRRRKKKKKKIIIIIINNNNNGGGGGGG')
        })
        this.props.setDateAndTime(this.props.match.params.id, this.state.showForm, this.state.currentDate, this.state.currentTime, toSchedule)
        this.setState({showForm: {}})
    }

    sendChat(e) {
        e.preventDefault()
        this.props.sendMessage(this.props.user, this.props.match.params.id, this.state.chatMessage)
        // this.setState({chatMessage: ''})
    }

    render() {
        const memberArray = []
        for (let i in this.state.itin.members) {
            let toAdd = this.props.users.filter(currentUser => (currentUser.key === this.state.itin.members[i].key))
            // memberArray.push(this.props.user[this.props.user.indexOf(this.state.itin.members[i].key]))
            memberArray.push(toAdd[0])
        }
        const ownerAdd = this.props.users.filter(currentUser => currentUser.email === this.state.itin.owner)
        memberArray.push(ownerAdd[0])
        console.log('MEMBERS: ', memberArray)
        /*
            FIREBASE EVENT LISTENERS
         =========================================================================================================================================================
        */
        const eventRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id).child('events')
        eventRef.on('child_changed', (data) => {
            const val = data.val()
            const itin = this.state.itin
            for (let key in this.state.itin.events) {
                if (this.state.itin.events[key].url === val.url) {
                    this.state.itin.events[key].schedule = val.schedule
                }
            }
            this.setState({itin: itin})
        })

        memberArray.map(member => {
            if (member) {
            const userRef = firebase.database().ref().child('users').child(member.key)
            userRef.on('child_changed', data => {
                if(typeof data.val() === 'string') {
                    this.props.loadInitialData()
                }
            })
            }
        })


        /*
        =========================================================================================================================================================
            END FIREBASE EVENT LISTNERS
        */

        // if (this.props.connect) {
        //     const messageRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id).child('messages')
        //     let initial = false
        //     messageRef.once('value', snap => {
        //         initial = true
        //     })
        //     messageRef.on('child_added', data => {
        //         if (!initial) return
        //         console.log('THE CHILD OF NEWMESSAGE CHANGED:  ', data.val())
        //     })
        // }
        const chatMessages = []

        

        let events = []
        let eventScheduled = []
        for (let key in this.state.itin.events) {
            if (this.state.itin.events[key].added && !this.state.itin.events[key].schedule){events.push(this.state.itin.events[key])}
            else if (this.state.itin.events[key].schedule){eventScheduled.push(this.state.itin.events[key])}
        }

        // First sorts the array by the date
        eventScheduled.sort((a,b) => {
            return new Date(a.schedule.toSchedule) - new Date(b.schedule.toSchedule);
          });
        
        // // Then sorts it on time
        // eventScheduled.sort((a,b) => {
        //     return new Date(a.schedule.time) - new Date(b.schedule.time);
        // });
        let scheduledDates = []
        for (let i = 0; i < eventScheduled.length; i++) {
            if (scheduledDates.indexOf(eventScheduled[i].schedule.date) === -1){scheduledDates.push(eventScheduled[i].schedule.date)}   
        }

        for (let i in this.state.itin.messages) {
            chatMessages.push(this.state.itin.messages[i])
        }
        console.log('IIITTTIIINNNN ', this.state.itin)
        return (
            <div>
                <div className="single-itin-header">
                    <BurgerMenu />
                    <img className='single-itin-image' src={this.state.itin.imageURL}/>
                    <h1 className="single-itin-title">{this.state.itin.name}</h1>
                </div>

                <MuiThemeProvider>
                <div className="single-itin-status">    
                    {memberArray.map(member => (
                        <List >
                        {member && <ListItem disabled={true}  leftAvatar={<Avatar backgroundColor={blue300} src={member.image} />}>
                            {member.name}: {member.status}
                        </ListItem>}
                        
                        </List>
                    ))}
                </div>
                </MuiThemeProvider>

                {this.props.connect && <MapComp itinKey = {this.props.match.params}/>}
                <h4>Events to be added to timeline: </h4>
                <div class="container">
                    <div class="row">
                        <div className="col-lg-4">
                        {events.map(event => (
                            <div key={event.url}>
                                <h5>{event.title}</h5>
                                <p>People going to this event: </p>
                                {event.likedBy && Object.keys(event.likedBy).map(likeByKey => (
                                    <p key={likeByKey}>{event.likedBy[likeByKey].name}</p>
                                ))}
                                <button disabled={!this.props.connect} onClick={() => {this.renderForm(event)}}>Set Schedule</button>
                            </div>
                        ))}
                        {this.state.showForm.title && 
                            <div>
                                <p>Schedule when to go to {this.state.showForm.title}</p>
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
                        <div className="col-lg-8">
                        {scheduledDates.map(date => (
                            <div key={date}>
                            <MuiThemeProvider>
                                
                                <h1>{date}</h1>
                                {eventScheduled.map(event => (
                                    <div key={event.url}>
                                    {event.schedule.date === date && 
                                        <div>
                                        <List>
                                            <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={blue300} />}>
                                                {event.title} @ {event.schedule.time}
                                            </ListItem>
                                        </List>
                                        </div>
                                    }
                                    </div>
                                ))}
                                </MuiThemeProvider>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <button onClick={() => this.props.history.push('/ideaboard')}>IdeaBoard</button>
                <button disabled={!this.props.conenct} onClick={() => this.setState({showChat: !this.state.showChat})}>Chat</button>
                {this.state.showChat && 
                <div>
                    {chatMessages.map(message => (
                        <p>{message.sender}: {message.content}</p>
                    ))}
                    <form onSubmit={this.sendChat}> 
                        <input name="chatMessage" 
                            type="text" 
                            value={this.state.chatMessage}
                            className="form-control" 
                            placeholder="Send message..."
                            onChange={(e) => {this.setState({chatMessage: e.target.value})}}/>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        itineraryName: state.currentItinerary,
        refresh: state.refresh,
        users: state.users,
        user: state.currentUser,
        connect: state.connect

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDateAndTime(itinId, event, date, time, toSchedule) {
            dispatch(setDateAndTime(itinId, event, date, time, toSchedule))
        },
        sendMessage(user, itin, message) {
            sendMessage(user, itin, message)
        },
        loadInitialData () {
            dispatch(fetchUsers())
        }
    }
}

const SingleItineraryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItinerary);
export default SingleItineraryContainer;