import firebase from '../firebase'
import axios from 'axios'
import {googServerKey, mapboxKey} from '../secrets.js'
import secondsConverter from 'seconds-converter'

/*
    ACTION TYPES
*/
export const FETCH_USER_COOR = 'FETCH_USER_COOR'
export const FETCH_COOR_TIME = 'FETCH_COOR_TIME'
export const SET_USER_COOR = 'SET_USER_COOR'
export const SET_COOR_TIME = 'SET_COOR_TIME'
export const PLACE_DETAILS = 'PLACE_DETAILS'
export const FETCH_LOCATION_NAMES = 'FETCH_LOCATION_NAMES'
export const FETCH_PLACES_COOR = 'FETCH_PLACES_COOR'
export const FETCH_COOR_DISTANCE = 'FETCH_COOR_DISTANCE'
export const SET_PLACES_COOR = 'SET_PLACES_COOR'
export const SET_COOR_DISTANCE = 'SET_COOR_DISTANCE'

/*
    THUNK MIDDLEWARE
*/
export const getUserCoordinates = userCoor => dispatch => {
    dispatch(fetchUserCoor(userCoor))
}

export const fetchDistanceMatrix = (userCoor, locations) => dispatch => {
    // let geoDistances = locations.map(location => {
    //     return Geofire.distance(userCoor, location)
    // })
    // console.log('geofireLocationssss', geoDistances)
    //dispatch(fetchCoorDistance(geoDistances))

}

export const fetchTimeMatrix = (userCoor, locations) => dispatch => {   
    let origin = `${userCoor[0]},${userCoor[1]}`
    let destinations = locations.map(location => {
        return `${location[0]},${location[1]}`
    }).join(';')

    axios.get(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${origin};${destinations}?sources=0&destinations=all&access_token=${mapboxKey}`)
    .then(res => res.data)
    .then(payload => {
        let durationsArr = payload.durations.map((duration) => {
            return duration
        })
        return durationsArr
    })
    .then(results => {
        return results[0].map((result , i) => {
            return secondsConverter(result, 'sec')
        })
    })
    .then(converts => {
        dispatch(fetchCoorTime(converts))
    })
    .catch(error => {
        console.log(error)
    })
}

export const googlePlacesDetails = (placeid) => dispatch => {
    const placesDetails = axios.post(`https://us-central1-deets-76612.cloudfunctions.net/helloWorld?placeid=${placeid}`);

        placesDetails
        .then(res => {
            dispatch(googlePlaceDetails(res.data))
        })
        .catch(err => console.log(err));
}

export const getLocationNames = key => dispatch => {
    let eventsRef = firebase.database().ref().child('itineraries').child(key.id).child('events')
    eventsRef.once('value')
    .then(snapshot => {
        let objSnap = Object.keys(snapshot.val())
        console.log('snapshotval', snapshot.val())
        let events = []
         objSnap.forEach(snap => {
            events.push(snapshot.val()[snap].address)
        })
        return events
    })
    .then(res => {
        dispatch(fetchLocationNames(res))
    })
}

export const postUserCoordinates =  itin => dispatch => {
    const noCoorRef = firebase.database().ref().child('itineraries').child(itin)
    noCoorRef.once('value')
    .then(result => {
        let payload = [];
        if (!navigator.geolocation){
            return;
        }

        function success(position) {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            payload.push(longitude, latitude)

            let fireRef = firebase.database().ref().child('itineraries').child(itin)
            fireRef.child('coordinates').push({lat: payload[0], long: payload[1]})         
            }
        
          function error() {
          }
        
          navigator.geolocation.getCurrentPosition(success, error)
          return payload;
         })
    .then(userLocation => {
        dispatch(setUserCoor(userLocation))
    })
    .catch(err => {
        console.log(err)
    })
}

export const postGeoLocation = itin => dispatch => {
    const userRef = firebase.database().ref().child('itineraries').child(itin).child('coordinates')
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googServerKey}`)
    .then(result => {
        let locationArr = Object.keys(result.data.location)
        let locationObj = result.data.location
        console.log('location***', result.data.location)
        let resultArr =[]
        resultArr.push(Number(locationObj[locationArr[1]]), Number(locationObj[locationArr[0]]))
        console.log('resultArr', resultArr)
        return resultArr
    })
    .then(resultArray => {
        userRef.push({lat: resultArray[0], long: resultArray[1]})
    })
    .catch(err => {
        console.log(err)
    })
}



/*
    ACTION CREATORS
*/
export const fetchUserCoor = coor => ({type: FETCH_USER_COOR, coor})
export const fetchCoorTime = times => ({type: FETCH_COOR_TIME, times})
export const setUserCoor = coor => ({type: SET_USER_COOR, coor})
export const googlePlaceDetails = details => ({type: PLACE_DETAILS, details})
export const fetchLocationNames = locations =>({type: FETCH_LOCATION_NAMES, locations})