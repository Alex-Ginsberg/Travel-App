import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker} from 'react-mapbox-gl'
import {geoFindMe, postUserCoordinates} from '../actions'
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

    // componentDidMount () {
    //   console.log('post coor hit')

    //   const coorRef = firebase.database().ref().child('itineraries').child(this.props.itinKey.id).child('coordinates')
    //   const noCoorRef = firebase.database().ref().child('itineraries').child(this.props.itinKey.id)
    //   let payload = [];



    //   function success(position) {
    //     console.log('success hit')
    //     let latitude = position.coords.latitude
    //     let longitude = position.coords.longitude
    //     payload.push(longitude, latitude)
    //     console.log('payload', payload)
        
    //     noCoorRef.child('coordinates').push({lat: payload[0], long: payload[1]})
    //     }
      
    //   noCoorRef.once('value')

      
    //   .then(result => {
          
  
    //       if (!navigator.geolocation){
    //           console.log('not supported')
    //           //output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    //           return;
    //         }
  
          
          
    //         function error() {
    //           console.log('sorry no geolocator')
    //           //output.innerHTML = "Unable to retrieve your location";
    //         }
          
    //         //output.innerHTML = "<p>Locating…</p>";
    //         navigator.geolocation.getCurrentPosition(success, error)
            
    //        })
    //   .catch(err => {
    //       console.log(err)
    //   })
    // }


    handleClickLocal (e) {
      let itinKey = this.props.itinKey
      console.log('itinkeylocal', this.props.itinKey)
      this.props.handleClick(itinKey)
      //let result = this.props.handleClick(key.id)
      // this.setState({
      //   userCoordinates: result,
      //   onClickDirty: true,
      // })
    }

    render() {
      let {handleClick, user, itineraryName, itinKey} = this.props
        //console.log('itinKey', itinKey) //object with id

      // let userCoor = firebase.database().ref().child('itineraries').child(itinKey)
      // userCoor.once('value')
      // .then(result => {
      //   console.log('resultval', result.val())
      // })
      return (
          <div>
            <Map
            zoom={[14]}
            center={[-74.0091638, 40.7049151]}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "600px",
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
              coordinates={[-74.0091638, 40.7049151]}
              anchor="bottom">
              <img  style = {{width: "64px", height: "64px"}} src="/assets/user-marker.png"/>
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
            <p><button onClick={this.handleClickLocal}>Show my location</button></p>
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
      dispatch(postUserCoordinates(keyID))
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


