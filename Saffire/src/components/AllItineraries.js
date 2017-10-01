import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary, setCurrentItinerary, getCurrentUser } from '../actions'
import BurgerMenu from './Menu'

class AllItineraries extends React.Component {
  constructor () {
    super()
    console.log('INSIDE ALL Itineraires')
    this.state = {
      itinArray: []
    }
  }

  componentDidMount () {
    const ref = firebase.database().ref()
    this.props.getCurrentUser()
    let itinArray = []
    let memberArray = []
    ref.on('value', snapshot => {
      let itinObj = snapshot.val().itineraries
        for (var key in itinObj) {
          if (itinObj[key].members) {
            for (var innerKey in itinObj[key].members) {
              memberArray.push(itinObj[key].members[innerKey])
            }
          }
          
        }
      console.log('MEMBERS: ', memberArray)   
      let memberKeys = []
      for (var i = 0; i < memberArray.length; i++) {
        memberKeys.push(memberArray[i].key)
      }  
      console.log(itinObj)
      for (var prop in itinObj) {
        if (firebase.auth().currentUser === null) {
          alert('Please Login')
          this.props.history.push('/');
          break;
        }
        else if (itinObj[prop].owner === firebase.auth().currentUser.email || memberKeys.includes(this.props.currentUser.key))
        itinArray.push(prop)
      }
      this.setState({itinArray: itinArray})
    }, error => console.log(error.code))
    
  }
  render () {
    console.log('CURRENT USER: ', this.props.currentUser)
    return (
      <div>
        <div id="burger">
          <BurgerMenu />
        </div>

        {this.state.itinArray.map(itin => (
          <button key={itin} onClick={() => {
            console.log('BEFORE DISPATCH: ', itin)
            firebase.database().ref(`/itineraries/${itin}`).once('value')
              .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin))
              .then(() => this.props.history.push('/money'))
            }}>{itin}</button>
        ))}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
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
