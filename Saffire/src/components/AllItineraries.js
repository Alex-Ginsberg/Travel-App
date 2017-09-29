import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
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
    // Should render out links to those itineraries instead of just rendering out ids
    // Turn them into links
    console.log('CURRENT USER: ', firebase.auth().currentUser)
    return (
      <div>
        {this.state.itinArray.map(itin => (
          <a key={itin} href={`/itineraries/${itin}`}>{itin}</a>
        ))}
      </div>

    )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(AllItineraries))
