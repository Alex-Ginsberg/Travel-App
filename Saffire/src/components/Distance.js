import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker, GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {fetchTimeMatrix, fetchDistanceMtrix} from '../actions'
import firebase from '../firebase'




class Distance extends Component {
  constructor(props){
    super(props)
    
  }

  componentDidMount (e) {
    this.props.handleClick(this.props.userCoordinates, this.props.locations)
    console.log('mountedpropsuserlocation', this.props)
  }
      
    render() {
      let {handleClick, user, itineraryName, itinKey, userCoordinates, locations} = this.props
      
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
  user: state.currentUser,
  currentCoordinates: state.currentCoordinates,
  }
}

const mapDispatch = dispatch => {
   return {
    handleClick (origin, destinations) {
      dispatch(fetchTimeMatrix(origin, destinations))
    }, 
  }
}

export default connect(mapState, mapDispatch)(Distance)