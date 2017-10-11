import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from '../firebase'
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import {setDateAndTime, sendMessage, fetchUsers, removeSchedule, googlePlacesDetails} from '../actions'
import BurgerMenu from './Menu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {MapComp} from '../components'
import cron from 'node-cron'
import axios from 'axios'
import NotificationCounter from './NotificationCounter'
import SkyLight from 'react-skylight';
import history from '../history';

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

        /*
            FIREBASE EVENT LISTENERS
         =========================================================================================================================================================
        */
        const eventRef = firebase.database().ref().child('itineraries').child(this.props.match.params.id).child('events')
        eventRef.on('child_changed', (data) => {
            const val = data.val()
            const itin = this.state.itin
            for (let key in this.state.itin.events) {
                if (this.state.itin.events[key].address === val.address) {
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
            if (this.state.itin.events[key].added && !this.state.itin.events[key].schedule){ console.log('not scheduled'); events.push(this.state.itin.events[key])}
            else if (this.state.itin.events[key].schedule){console.log('scheduled'); eventScheduled.push(this.state.itin.events[key])}
        }

        // First sorts the array by the date
        eventScheduled.sort((a,b) => {
            return new Date(a.schedule.toSchedule) - new Date(b.schedule.toSchedule);
          });
        
        let scheduledDates = []
        for (let i = 0; i < eventScheduled.length; i++) {
            if (scheduledDates.indexOf(eventScheduled[i].schedule.date) === -1){scheduledDates.push(eventScheduled[i].schedule.date)}   
        }

        for (let i in this.state.itin.messages) {
            chatMessages.push(this.state.itin.messages[i])
        }


        const myBigGreenDialog = {
            width: '70%',
            height: '700px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-350px',
            marginLeft: '-35%',
            backgroundColor: '#fff',
            borderRadius: '2px',
            zIndex: 100,
            padding: '15px',
            boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
            'transition-duration' : '400ms',
            overflow: 'auto'
        };


        return (
            <div>
                <div className="single-itin-header">
                    <BurgerMenu />
                    <NotificationCounter />

                    <div className="single-itin-dash">
                        <div className="row">

                        <div className="col-lg-6">
                            <h1 className="single-itin-title">{this.state.itin.name}</h1>
                            <MuiThemeProvider>
                                <div className="single-itin-status">
                                    {memberArray.map(member => (
                                        <List >
                                            {member && <ListItem disabled={true}  leftAvatar={<Avatar backgroundColor={blue300} src={member.image} />}>
                                                {member.name}: {member.status}
                                            </ListItem>}

                                        </List>
                                    ))}
                                    <div className="idea-to-itin">
                                        <div className="view-itinerary" onClick={() => {history.push(`/ideaboard/${this.props.match.params.id}`)}} >IDEABOARD</div>
                                    </div>
                                </div>
                            </MuiThemeProvider>
                        </div>
                            <div className="col-lg-6">
                                <img className='single-itin-image' src={this.state.itin.imageURL}/>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="single-itin-map">
                {this.props.connect &&
                <MapComp itinKey = {this.props.match.params}/>
                }
                </div> 




                {/*timeline*/}
                <div className="single-itin-schedule">
                    {/*<div className="row">*/}


                        <div className="col-lg-6">

                        <div className="single-itin-scroll">
                            <div className="single-itin-schedule-list">
                                <h4 className="single-itin-event-title">TIMELINE</h4>

                                {scheduledDates.map(date => (
                                    <div key={date} className="single-itin-event-scheduler-node" >
                                        <MuiThemeProvider>

                                            <div className="single-itin-event-scheduler-info">
                                                <h1 className="schedule-list-title">{date}</h1>

                                                {eventScheduled.map(event => (
                                                    <div key={event.url}>

                                                        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={this.props.googleDetails.name}>
                                                            <section>
                                                                {/*{this.props.googleDetails.openingHours}*/}
                                                                {/*<h4>{this.props.googleDetails.openingHours.open_now ? 'Open' : 'Closed'}</h4>*/}
                                                                <h4>Rating {this.props.googleDetails.rating}</h4>

                                                                <section className="google-details-main">

                                                                    { this.props.googleDetails.photos &&

                                                                    <section id="photos">
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[0].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[1].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[2].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[3].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[4].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[5].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                                                                    </section>
                                                                    }


                                                                    <div className="google-details-info">
                                                                        {this.props.googleDetails.openingHours && this.props.googleDetails.openingHours.open_now ? 'OPEN NOW' : '' }

                                                                        <div className="google-details-openingHours">
                                                                            {this.props.googleDetails.openingHours && this.props.googleDetails.openingHours.weekday_text ?
                                                                                this.props.googleDetails.openingHours.weekday_text.map(day => {
                                                                                    return <span>{day}</span>
                                                                                })
                                                                                :
                                                                                ''
                                                                            }
                                                                        </div>
                                                                        <span><a href={this.props.googleDetails.website}>{this.props.googleDetails.website}</a></span>
                                                                        <h4>Rating {this.props.googleDetails.rating}</h4>




                                                                        <h3 className="details-locationnear">{this.props.googleDetails.name} is located near {this.props.googleDetails.vicinity}</h3>





                                                                        <div className="google-details-reviews">
                                                                            { this.props.googleDetails.reviews &&

                                                                            this.props.googleDetails.reviews.map(review => {
                                                                                return (<div className="google-individual-review">
                                                                                    <p>Rating {review.rating}</p>
                                                                                    <p>{review.text}</p>
                                                                                    <p>{review.author_name}</p>
                                                                                </div>)
                                                                            })

                                                                            }
                                                                        </div>




                                                                    </div>

                                                                </section>

                                                            </section>
                                                        </SkyLight>
                                                        
                                                        {event.schedule.date === date && 

                                                            <List>
                                                                <div onClick={async () => {
                                                                    await this.props.getGoogleDeets(event.placeID)
                                                                    await this.simpleDialog.show()
                                                                }}>
                                                                    <ListItem disabled={true} hoverColor={indigo900} leftAvatar={<Avatar backgroundColor={blue300} />}>
                                                                        {event.title.split(',')[0]} @ {event.schedule.time}
                                                                    </ListItem>

                                                                    {this.props.connect && <button className="btn btn-danger" onClick={() => {
                                                                    this.props.removeSchedule(this.props.match.params.id, event)
                                                                    }}>REMOVE</button>}
                                                                </div>
                                                            </List>
                                                        }
                                                    </div>
                                                ))}
                                                </div>
                                                



                                              

                                    

                                </MuiThemeProvider>
                            </div>
                        ))}

                             {events.map(event => (
                                 <div key={event.url} className="single-itin-event-scheduler-node">
                                     <MuiThemeProvider>

                                         <div className="single-itin-event-scheduler-info">
                                             <List>
                                                 <ListItem disabled={true} hoverColor={indigo900} leftAvatar={ <Avatar backgroundColor={blue300} />}>
                                                     <h5>{event.title}</h5>
                                                     <p>People going to this event: </p>
                                                     {event.likedBy && Object.keys(event.likedBy).map(likeByKey => (
                                                         <p key={likeByKey}>{event.likedBy[likeByKey].name}</p>
                                                     ))}
                                                 </ListItem>
                                                 <button className="single-itin-event-scheduler-button" disabled={!this.props.connect} onClick={() => {this.renderForm(event)}}>Set Schedule</button>
                                             </List>
                                         </div>
                                     </MuiThemeProvider>
                                 </div>
                             ))}


                            </div>

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
                                <button onClick={() => {
                                    const toSchedule = new Date(
                                        this.state.currentDate.getFullYear(),
                                        this.state.currentDate.getMonth(),
                                        this.state.currentDate.getDate(),
                                        this.state.currentTime.getHours(),
                                        this.state.currentTime.getMinutes(),
                                        this.state.currentTime.getSeconds(),
                                        this.state.currentTime.getMilliseconds()
                                    )
                                    this.props.setDateAndTime(this.props.match.params.id, this.state.showForm, this.state.currentDate, this.state.currentTime, toSchedule)
                                    this.setState({showForm: {}})
                                    const schedString = `${toSchedule.getSeconds()} ${toSchedule.getMinutes()} ${toSchedule.getHours() - 1} ${toSchedule.getDate()} ${toSchedule.getMonth() + 1} ${toSchedule.getDay()}`

                                    memberArray.map(member => {
                                        cron.schedule(schedString, () => {
                                            axios({ url: 'https://fcm.googleapis.com/fcm/send',
                                            method: 'post',
                                            headers: {
                                                'Authorization': 'key=AAAA9J-m9SY:APA91bHXe_r13MYn-BY6iWZwXQ6tOmUZZv9UeMC7LfQdgGbxXKhbnoBWNQifh-2E-t9gVGFfaiKR_ivv1OtuBufWboAhJ5SeWNdrkWiQg6WNHY5b2DXSM4Sp4_rZO60y4Nq6BNjYUsk8',
                                                'Content-Type': 'application/json',
                                            },
                                            data: {
                                                    "notification": {
                                                    "title": "Saffire",
                                                    "body": `You have an hour until your next event`,
                                                    "icon": "firebase-logo.png",
                                                    "click_action": "https://deets-76612.firebaseapp.com/requests"
                                                    },
                                                    "to": member.localToken
                                                }
                                    })
                                    .then(response => console.log('post sent', response.data))
                                                .catch(err => console.log(err));
                                        })
                                    })
                                   
                                    // schedule.scheduleJob(toSchedule, () => {
                                    //     alert('hi')
                                    // })
                                    
                                }}>Submit event</button>
                            </div>
                            }
                        </div>

                    </div>
                </div>



                {/*<button onClick={() => this.props.history.push('/ideaboard')}>IdeaBoard</button>*/}
                {/*<button disabled={!this.props.conenct} onClick={() => this.setState({showChat: !this.state.showChat})}>Chat</button>*/}
                {/*{this.state.showChat && */}
                {/*<div>*/}
                    {/*{chatMessages.map(message => (*/}
                        {/*<p>{message.sender}: {message.content}</p>*/}
                    {/*))}*/}
                    {/*<form onSubmit={this.sendChat}> */}
                        {/*<input name="chatMessage" */}
                            {/*type="text" */}
                            {/*value={this.state.chatMessage}*/}
                            {/*className="form-control" */}
                            {/*placeholder="Send message..."*/}
                            {/*onChange={(e) => {this.setState({chatMessage: e.target.value})}}/>*/}
                        {/*<button type="submit" className="btn btn-primary">Send</button>*/}
                    {/*</form>*/}
                {/*</div>*/}
                {/*}*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        refresh: state.refresh,
        users: state.users,
        user: state.currentUser,
        connect: state.connect,
        googleDetails: state.googleDetails,

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
        },
        removeSchedule(itin, event) {
            dispatch(removeSchedule(itin, event))
        },
        getGoogleDeets (placeID) {
            dispatch(googlePlacesDetails(placeID))
        }
    }
}

const SingleItineraryContainer = connect(mapStateToProps, mapDispatchToProps)(SingleItinerary);
export default SingleItineraryContainer;