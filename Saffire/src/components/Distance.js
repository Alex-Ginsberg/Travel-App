import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker, GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {fetchTimeMatrix, fetchDistanceMatrix, getLocationNames} from '../actions'
import firebase from '../firebase'




class Distance extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount (e) {
    this.props.handleTime(this.props.userCoordinates, this.props.locations)
    this.props.handleDistance(this.props.userCoordinates, this.props.locations)
    this.props.handleLocation(this.props.itinKey)
  }
      
    render() {
      let {handleClick, user, itineraryName, itinKey, userCoordinates, locations, currentCoordinates, locationList} = this.props
      return (
        
          <div>
            <p>Travel Time by Car</p>
            <ul> 
            {currentCoordinates.coorTime.map((time, i) => {
              if( i !== 0){
                return (
                  <li key={i}>
                  {`${time.days} days, ${time.hours} hours, ${time.minutes} minutes`}
                  {}
                  </li>
                )
              }
            })}
            </ul>
          </div>
          )
      }
    }

const mapState = state => {
  
  return {
  itineraryName: state.currentItinerary,
  users: state.users,
  user: state.currentUser,
  currentCoordinates: state.currentCoordinates,
  locationList: state.locationList,
  }
}

const mapDispatch = dispatch => {
   return {
    handleTime (origin, destinations) {
      dispatch(fetchTimeMatrix(origin, destinations))
    }, 
    handleDistance (origin, destinations) {
      dispatch(fetchDistanceMatrix(origin, destinations))
    },
    handleLocation(key) {
      dispatch(getLocationNames(key))
    }
  }
}

export default connect(mapState, mapDispatch)(Distance)