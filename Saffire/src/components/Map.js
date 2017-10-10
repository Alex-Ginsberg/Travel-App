import React, {Component} from 'react'
import googleMaps from '@google/maps'
import {googServerKey, mapboxKey} from '../secrets.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, {Layer, Feature, Marker, GeoJSONLayer, Popup} from 'react-mapbox-gl'
import {geoFindMe, postUserCoordinates, postGeoLocation, getUserCoordinates} from '../actions'
import firebase from '../firebase'
import {Distance, Loading} from '../components'



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
      locations: [],
    }
  }

  // componentWillMount() {
  //   this.props.handleClick(this.props.itinKey)
  // }
    
    // componentWillReceiveProps (nextProps) {
    //   console.log('nextprops***', nextProps)
    //   this.setState({userCoordinates: nextProps.currentCoordinates.userCoor})
      
    //   //this.props.handleUser(nextProps.currentCoordinates.userCoor)
    // }

    componentDidMount() {
      console.log('component mount hit')
      //this.setState({userCoordinates: this.props.handleClick(this.props.itinKey.id)})
     this.props.handleClick(this.props.itinKey)

     let userCoordinates = this.state.userCoordinates
     let userLocation = []
     let userCoor = firebase.database().ref().child('itineraries').child(this.props.itinKey.id).child('coordinates')

     //get user coordinate
     userCoor.once('value')
     .then(result => {
       let objResult = Object.keys(result.val())
       userLocation.push(result.val()[objResult[0]].lat, result.val()[objResult[0]].long )
       console.log('userlocation', userLocation)
       this.setState({userCoordinates: userLocation})
     })

     //get events locations
     let fireLocationsRef = firebase.database().ref().child('itineraries').child(this.props.itinKey.id).child('events')
     fireLocationsRef.once('value')
     .then(result => result.val())
     .then(payload => {
    if(payload){
     let added = Object.keys(payload).filter(itin => {
         return payload[itin].added === true
       })
      let trueEvents = [];
      for(let i = 0; i < added.length; i++){
        trueEvents.push(payload[added[i]])
      }
      return trueEvents;
     }})
     .then(events => {
       if(events){
       console.log('events***', events)
       return events.map(event => {
         return event.location
       })
       
     }})
     .then(locations => {
       let locationState = [];
       if(locations){
       locations.forEach(location => {
        locationState.push([location.lng, location.lat])
       })
       this.setState({locations: locationState})
     }})
     
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

    onClickMap(marker, evt) {
      console.log('evt*****', evt)
    }

    render() {
      let {handleClick, user, itineraryName, itinKey, currentCoordinates} = this.props

      console.log('propsuserCoor', currentCoordinates)
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
            
            { this.state.userCoordinates.length &&
            <Map 
            key = "UniqueMap"
            zoom={[1]}
            center={[0, 0]}
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "25em",
              width: "100%"
            }}
            
            >
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[-74.0, 40.731]}/>
              </Layer>
              <div className="map-marker">
            <Marker 
              coordinates={currentCoordinates.userCoor}
              anchor="bottom"
              >
              <img  style = {{width: "54px", height: "54px"}} src="/assets/user-marker.png"/>
            </Marker>
            {this.state.locations && this.state.locations.map((location, i)=> {
              return (
                <div key={location[i]} className="place-marker">
                <Marker
                coordinates={location}
                anchor="bottom"
                >
                <img style = {{width: "54px", height: "54px"}} src="/assets/map-marker.png"/>
                </Marker>
                </div>
              )
            })}
              </div>
              <div className="user-Marker">
                {}
              </div>
          </Map> 
        }
          {/* <div>
            <p><button onClick={this.handleClickLocal}>Show my location</button></p>
            <div id="out"></div>
          </div> */}
           <div>
             {this.state.locations.length && 
          <Distance userCoordinates={this.state.userCoordinates} locations={this.state.locations}/>
             }
          </div> 
          </div>
          
          )
      
      }
    }

const mapState = state => {
  console.log('stateprops', state.current)
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
      console.log('clicked***')
      console.log('itinKey******', key.id)
      let keyID = key.id
      dispatch(postUserCoordinates(keyID))
    }, 
    handleUser (userCoor) {
      dispatch(getUserCoordinates(userCoor))
    }
    
  }
}

export default connect(mapState, mapDispatch)(MapComp)

