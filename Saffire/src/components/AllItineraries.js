import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary, setCurrentItinerary } from '../actions'
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
    let itinArray = []
    ref.on('value', snapshot => {
      let itinObj = snapshot.val().itineraries
      console.log(itinObj)
      for (var prop in itinObj) {
        if (firebase.auth().currentUser === null) {
          alert('Please Login')
          this.props.history.push('/');
          break;
        }
        else if (itinObj[prop].owner === firebase.auth().currentUser.email)
        itinArray.push(prop)
      }
      this.setState({itinArray: itinArray})
    }, error => console.log(error.code))
  }
  render () {
    console.log('CURRENT USER: ', firebase.auth().currentUser)
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

const mapDispatchToProps = (dispatch) => {
  return {

      setItineraryName(itineraryName) {
          dispatch(postItinerary(itineraryName))
      },

      setCurrentItinerary(itinerary, itin) {
        dispatch(setCurrentItinerary(itinerary, itin))
      }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatchToProps)(AllItineraries))
