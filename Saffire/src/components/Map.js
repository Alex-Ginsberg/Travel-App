import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
//import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl'




let googleMapsClient = googleMaps.createClient({
  key: googServerKey
})

// mapboxgl.accessToken = mapboxKey;
// const map = new mapboxgl.Map({
//   container: "map-canvas",
//   center: [-74.0, 40.731],
//   zoom: 12.5, // starting zoom
//   pitch: 35,
//   bearing: 20,
//   style: "mapbox://styles/mapbox/streets-v10"
// });

//create map
const Map = ReactMapboxGl({
    accessToken: mapboxKey
})

//googleMaps

export class MapComp extends Component {
    render() {
        return (
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "500px",
              width: "100%"
            }}>
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
              </Layer>
          </Map>
          
        );
      }
    }



export default MapComp