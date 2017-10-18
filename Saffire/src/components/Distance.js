import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTimeMatrix, fetchDistanceMatrix, getLocationNames} from '../actions'




class Distance extends Component {

  componentDidMount (e) {
    this.props.handleTime(this.props.userCoordinates, this.props.locations)
    this.props.handleDistance(this.props.userCoordinates, this.props.locations)
    this.props.handleLocation(this.props.itinKey)
  }
      
    render() {
      let {currentCoordinates} = this.props
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