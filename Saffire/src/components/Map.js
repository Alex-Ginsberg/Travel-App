import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker} from 'react-mapbox-gl'
import {geoFindMe, postUserCoordinates, postGeoLocation} from '../actions'
import firebase from '../firebase'



//creates Google Client and serves key
let googleMapsClient = googleMaps.createClient({
  key: googServerKey
})

//creates map and serves accessToken
const Map = ReactMapboxGl({
    accessToken: mapboxKey
})


export class MapComp extends Component {
  constructor(props){
    super(props)
    this.handleClickLocal = this.handleClickLocal.bind(this)
    this.state = {
      userCoordinates: [],
      onClickDirty: false,
    }
  }

    

    componentDidMount() {
      console.log('component mount hit')
      // this.setState({userCoordinates: this.props.handleClick(this.props.itinKey.id)})
     this.props.handleClick(this.props.itinKey)
    }

    handleClickLocal (e) {
      let itinKey = this.props.itinKey
      this.props.handleClick(itinKey)
      //let result = this.props.handleClick(key.id)
      // this.setState({
      //   userCoordinates: result,
      //   onClickDirty: true,
      // })
    }

    render() {
      let {handleClick, user, itineraryName, itinKey} = this.props
      let userCoordinates = this.state.userCoordinates
      let userLocation = []
      let userCoor = firebase.database().ref().child('itineraries').child(itinKey.id).child('coordinates')

      //get user coordinate
      userCoor.once('value')
      .then(result => {
        let objResult = Object.keys(result.val())
        userLocation.push(result.val()[objResult[0]].lat, result.val()[objResult[0]].long )
        console.log('userlocation', userLocation)
      })
      return (
          <div>
            <Map
            zoom={[14]}
            center={[-74.0091638, 40.7049151]}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "300px",
              width: "100%"
            }}>
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[-74.0, 40.731]}/>
              </Layer>
              <div className="map-marker">
            <Marker 
              coordinates={userLocation}
              anchor="bottom">
              <img  style = {{width: "54px", height: "54px"}} src="/assets/user-marker.png"/>
            </Marker>
              {/* this.state.userCoordinates.length && <Marker
              coordinates={this.state.userCoordinates}
              anchor="bottom">
              <img  style = {{width: "64px", height: "64px"}} src="/assets/map-marker.png"/>
              </Marker> */}
              </div>
              <div className="user-Marker">
                {}
              </div>
          </Map>
          <div>
            {/*<p><button onClick={this.handleClickLocal}>Show my location</button></p>*/}
            <div id="out"></div>
          </div>
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
      console.log('clicked***')
      console.log('itinKey******', key.id)
      let keyID = key.id
      dispatch(postGeoLocation(keyID))
    }, 
  }
}

export default connect(mapState, mapDispatch)(MapComp)

// const { Marker } = require("mapbox-gl");

// const iconURLs = {
//   hotels: "http://i.imgur.com/D9574Cu.png",
//   restaurants: "http://i.imgur.com/cqR6pUI.png",
//   activities: "http://i.imgur.com/WbMOfMl.png"
// };

// const buildMarker = (type, coords) => {
//   const markerEl = document.createElement("div");
//   markerEl.style.backgroundSize = "contain";
//   markerEl.style.width = "32px";
//   markerEl.style.height = "37px";
//   markerEl.style.backgroundImage = `url(${iconURLs[type]})`;
//   return new Marker(markerEl).setLngLat(coords);
// };

// module.exports = buildMarker;


