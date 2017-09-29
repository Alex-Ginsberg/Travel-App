import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary } from '../actions'

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
        if (itinObj[prop].owner === firebase.auth().currentUser.email)
        itinArray.push(prop)
      }
      this.setState({itinArray: itinArray})
    }, error => console.log(error.code))
  }
  render () {
    console.log('CURRENT USER: ', firebase.auth().currentUser)
    return (
      <div>
        {this.state.itinArray.map(itin => (
          <button key={itin} onClick={() => {
            firebase.database().ref(`/itineraries/${itin}`).once('value')
              .then(snapshot => this.props.setItineraryName(snapshot.val()))
            this.props.history.push('/home')
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
      }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatchToProps)(AllItineraries))
