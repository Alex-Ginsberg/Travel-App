import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
//import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker} from 'react-mapbox-gl'
import {geoFindMe, postCoordinates} from '../actions'



//creates Google Client and serves key
let googleMapsClient = googleMaps.createClient({
  key: googServerKey
})

//creates map and serves accessToken
const Map = ReactMapboxGl({
    accessToken: mapboxKey
})

// Map.addControl(new mapboxgl.GeolocateControl({
//   positionOptions: {
//       enableHighAccuracy: true
//   },
//   trackUserLocation: true
// }));

//googleMaps

export class MapComp extends Component {
  constructor(props){
    super(props)
    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClickLocal = this.handleClickLocal.bind(this)
    this.state = {
      userCoordinates: [],
      onClickDirty: false,
    }
  }


  handleClick1(e) {
      e.preventDefault();
      console.log('handleClick local')
      
      var output = document.getElementById("out");

      //if no geolocation on browser
      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }
      
      //success function triggers when allowed
      function success(position) {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        let userCoor = [];
        userCoor.push(latitude, longitude)

        this.setState({
          userCoordinates: userCoor,
          onClickDirty: true,
        })

        console.log('userCoor', userCoor)

        
        
      }

      
      //error handler
      function error() {
        output.innerHTML = "Unable to retrieve your location";
      }
    
      output.innerHTML = "<p>Locating…</p>";

      navigator.geolocation.getCurrentPosition(success, error);
    
  }

    handleClickLocal (e) {
      let result = this.props.handleClick()
      this.setState({
        userCoordinates: result,
        onClickDirty: true,
      })
    }

    render() {
      let {handleClick} = this.props
      
        return (
          <div>
            <Map
            zoom={[14]}
            center={[-74.0091638, 40.7049151]}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "900px",
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

}

const mapDispatch = dispatch => {
   return {

    handleClick () {
      console.log('clicked***')
      dispatch(postCoordinates)
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


