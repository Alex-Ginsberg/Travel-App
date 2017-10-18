import React, { Component } from 'react'
import { mapboxKey } from '../secrets.js'
import { connect } from 'react-redux'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import { postUserCoordinates, getUserCoordinates } from '../actions'
import firebase from '../firebase'
import { Distance } from '../components'


//creates map and serves accessToken
const Map = ReactMapboxGl({
    accessToken: mapboxKey,
    doubleClickZoom: true,
})


export class MapComp extends Component {
  constructor(props){
    super(props)
    this.onClickMap = this.onClickMap.bind(this)
    this.onClickMap = this.onClickMarker.bind(this)
    this.state = {
      userCoordinates: [],
      onClickDirty: false,
      locations: []
    }
  }

    componentDidMount() {

     // let userCoordinates = this.state.userCoordinates
     let userLocation = []
     let userCoor = firebase.database().ref().child('itineraries').child(this.props.itinKey.id).child('coordinates')

     //get user coordinate
     userCoor
         .once('value')
         .then(result => {
           let objResult = Object.keys(result.val())
           userLocation.push(result.val()[objResult[0]].lat, result.val()[objResult[0]].long )
           this.setState({userCoordinates: userLocation})
         })
         .catch(err => console.log(err))

     //get events locations
     let fireLocationsRef = firebase.database().ref().child('itineraries').child(this.props.itinKey.id).child('events')
     fireLocationsRef
         .once('value')
         .then(result => result.val())
         .then(payload => {
            if (payload) {
                let added = Object.keys(payload).filter(itin => { return payload[itin].added === true })
                let trueEvents = [];
                for (let i = 0; i < added.length; i++) {
                    trueEvents.push(payload[added[i]])
                }
                return trueEvents;
             }})
         .then(events => {
           if (events) { return events.map(event => { return event.location })}
         })
         .then(locations => {
           let locationState = [];
           if (locations) { locations.forEach(location => { locationState.push([location.lng, location.lat]) })
           this.setState({locations: locationState})
         }})
         .catch(err => console.log(err))
    }

    onClickMap(map, evt) {
      map.flyTo({
        center: [evt.lngLat.lng, evt.lngLat.lat],
      })
    }

    onClickMarker(marker) {
      marker.map.flyTo({
        center: [marker.lngLat.lng, marker.lngLat.lat],
        zoom: 5.4,
        curve: 2,
      })
    }

    render() {
      // let {handleClick, user, itineraryName, itinKey, currentCoordinates} = this.props
      return (
          <div>
           {this.state.userCoordinates.length &&
                <Map
                    key = "UniqueMap"
                    zoom={[1.1]}
                    center={[-35.01, 30.09]}
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                      height: "50vh",
                      width: "70vw",
                    }}>
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    {this.state.locations.map((location, index) => (
                        <Feature
                            key={index}
                            onClick={this.onClickMarker}
                            coordinates={location}/>
                    ))}
                </Layer>

                <Layer
                    type="symbol"
                    id="marker-user"
                    layout={{ "icon-image": "marker-15" }}>

                <Feature
                    onClick={this.onClickMarker}
                    coordinates={this.state.userCoordinates}/>
                </Layer>

                <div className="map-marker">
                <Marker coordinates={this.state.userCoordinates} anchor="bottom">
                  <img  style = {{width: "54px", height: "54px"}} src="/assets/user-marker.png" alt="map-marker"/>
                </Marker>
                {this.state.locations &&
                    this.state.locations.map((location, i)=> {
                      return (
                        <Marker coordinates={location} anchor="bottom">
                            <img style = {{width: "40px", height: "40px"}} src="/assets/map-marker.png" alt="map-marker"/>
                        </Marker>
                      )}
                )}
              </div>

              <div className="user-Marker">{}</div>
          </Map> 
            }

           <div>
             {this.state.locations.length && 
                <Distance userCoordinates={this.state.userCoordinates} itinKey={this.props.itinKey} locations={this.state.locations}/>
             }
          </div> 
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
    handleClick (key) {
      let keyID = key.id
      dispatch(postUserCoordinates(keyID))
    },
    handleUser (userCoor) {
      dispatch(getUserCoordinates(userCoor))
    }
  }
}

export default connect(mapState, mapDispatch)(MapComp)

