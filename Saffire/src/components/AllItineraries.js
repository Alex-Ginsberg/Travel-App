import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary, setCurrentItinerary, getCurrentUser } from '../actions'
import BurgerMenu from './Menu'
import NotificationCounter from './NotificationCounter'

// const losAngeles = "../destination-images/los-angeles.jpeg";

class AllItineraries extends React.Component {
  constructor () {
    super()
    this.state = {
      itinArray: []
    }
  }

  componentDidMount () {
    //If the user is connected to the internet, access the itineraries via firebase, as this will be the most recently updated itineraries 
    if (this.props.connect) {
      const ref = firebase.database().ref()
      let itinArray = []
      ref.on('value', snapshot => {
        let allItins = snapshot.val().itineraries
        for (var key in allItins) {
          let toAdd = allItins[key]
          toAdd.key = key
          itinArray.push(toAdd)
        }
        this.setState({itinArray: itinArray})
    })}

    //If the user is not connected to the internet, access all itineraries via what is kept on local storage 
    else {
      this.setState({itinArray: JSON.parse(localStorage.allItineraries)})
    }
  }

  render () {

    let toRenderItins = []
    // If the user is connected to the internet, set currentUser to be what is one state
    // If the user is not connected to the internet, we cannot rely on the state for info, so we take the user info stored on local storage
    const currentUser = this.props.connect ? this.props.currentUser : JSON.parse(localStorage.currentUser)

    if (currentUser.key) {
      for (let i = 0; i < this.state.itinArray.length; i++) {
        if (this.state.itinArray[i].owner === currentUser.email){
          toRenderItins.unshift(this.state.itinArray[i])
        }
        else if (this.state.itinArray[i].members) {
          for (let key in this.state.itinArray[i].members) {
            if (this.state.itinArray[i].members[key].key === currentUser.key){
              toRenderItins.unshift(this.state.itinArray[i])
            }
          }
        }
      }
    }


    return (
      <div className="saffire-all-itineraries-div">

        <BurgerMenu />
        <NotificationCounter />

        <h1>SAFFIRE</h1>

        <h3>MY ITINERARIES</h3>

        <div className = "saffire-all-itineraries-container" >
          {
            toRenderItins.map(itin => (

                <div className="saffire-all-itineraries-item" key={itin.key}>
                    <img src={itin.imageURL} className = "saffire-all-itineraries-img" onClick={() => {
                        firebase.database().ref(`/itineraries/${itin.key}`)
                            .once('value')
                            .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin.key))
                            .then(() => this.props.history.push(`/itinerary/${itin.key}`))
                            .catch(err => console.log(err)) }}
                    />

              <div className="little-saffire-item" key={itin.key}>
                  <span className="sapphire-itin-name-x" onClick={() => {
                      firebase.database().ref(`/itineraries/${itin.key}`)
                          .once('value')
                          .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin.key))
                          .then(() => this.props.history.push(`/itinerary/${itin.key}`))
                          .catch(err => console.log(err)) }}
                  >{itin.name}</span>

                <span className = "sapphire-itin-name-z"> <img src = "https://files.slack.com/files-pri/T024FPYBQ-F7DDVNDUG/person-icon.png" />{currentUser.friends !== undefined ? Object.keys(currentUser.friends).length + ' Friend' : '0 Friend'}</span>
                <span className = "sapphire-itin-name-xx" onClick={() => this.props.history.push(`/ideaboard/${itin.key}`)}>IDEA BOARD</span>
              </div>

            </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser,
      connect: state.connect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setItineraryName(itineraryName) {
          dispatch(postItinerary(itineraryName))
      },
      setCurrentItinerary(itinerary, itin) {
        dispatch(setCurrentItinerary(itinerary, itin))
      },
      getCurrentUser() {
        dispatch(getCurrentUser())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllItineraries))
