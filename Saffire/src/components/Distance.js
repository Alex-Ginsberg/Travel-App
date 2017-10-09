import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker, GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {fetchDistanceMatrix} from '../actions'
import firebase from '../firebase'



//creates Google Client and serves key
let googleMapsClient = googleMaps.createClient({
  key: googServerKey
})

//creates map and serves accessToken
const Map = ReactMapboxGl({
    accessToken: mapboxKey
})


export class Distance extends Component {
  constructor(props){
    super(props)
    
  }
      
    render() {
      let {handleClick, user, itineraryName, itinKey, userCoordinates, locations} = this.props
      // let userCoordinates = this.state.userCoordinates
      // let userLocation = []
      // let userCoor = firebase.database().ref().child('itineraries').child(itinKey.id).child('coordinates')

      // //get user coordinate
      // userCoor.once('value')
      // .then(result => {
      //   let objResult = Object.keys(result.val())
      //   userLocation.push(result.val()[objResult[0]].lat, result.val()[objResult[0]].long )
      //   console.log('userlocation', userLocation)
      // })
      
      return (
        
          <div>
            <h1>hello distance component</h1>

            
          </div>
          
          )
      
      }
    }

const mapState = state => {
  return {
  itineraryName: state.currentItinerary,
  users: state.users,
  user: state.currentUser
  }
}

const mapDispatch = dispatch => {
   return {
    handleClick (key) {
      
      dispatch(fetchDistanceMatrix())
    }, 
  }
}

export default connect(mapState, mapDispatch)(Distance)