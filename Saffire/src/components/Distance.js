import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker, GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {fetchTimeMatrix, fetchDistanceMatrix} from '../actions'
import firebase from '../firebase'




class Distance extends Component {
  constructor(props){
    super(props)
    
  }

  componentDidMount (e) {
    this.props.handleTime(this.props.userCoordinates, this.props.locations)
    console.log('mountedpropsuserlocation', this.props)
    this.props.handleDistance(this.props.userCoordinates, this.props.locations)
  }
      
    render() {
      let {handleClick, user, itineraryName, itinKey, userCoordinates, locations, currentCoordinates} = this.props
      
      return (
        
          <div>
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
  }
}

const mapDispatch = dispatch => {
   return {
    handleTime (origin, destinations) {
      dispatch(fetchTimeMatrix(origin, destinations))
    }, 
    handleDistance (origin, destinations) {
      dispatch(fetchDistanceMatrix(origin, destinations))
    }
  }
}

export default connect(mapState, mapDispatch)(Distance)