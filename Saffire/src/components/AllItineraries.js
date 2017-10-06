import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary, setCurrentItinerary, getCurrentUser } from '../actions'
import BurgerMenu from './Menu'

// const losAngeles = "../destination-images/los-angeles.jpeg";

class AllItineraries extends React.Component {
  constructor () {
    super()
    this.state = {
      itinArray: []
    }
  }

  componentDidMount () {
    const ref = firebase.database().ref()
    let itinArray = []
    ref.on('value', snapshot => {
      let allItins = snapshot.val().itineraries
      for (var key in allItins) {
        let toAdd = allItins[key]
        toAdd.key = key
        itinArray.push(toAdd)      
      }
      this.setState({itinArray: itinArray})
    })
  }

  render () {

    let toRenderItins = []
    if (this.props.currentUser.key) {
      for (var i = 0; i < this.state.itinArray.length; i++) {
        if (this.state.itinArray[i].owner === this.props.currentUser.email){ 
          toRenderItins.unshift(this.state.itinArray[i])
        }
        else if (this.state.itinArray[i].members) {
          for (var key in this.state.itinArray[i].members) {
            if (this.state.itinArray[i].members[key].key === this.props.currentUser.key){
              toRenderItins.unshift(this.state.itinArray[i])
            }
          }
        }
      }
    }
    


    console.log('toRender******', toRenderItins);

    return (
      <div className="saffire-all-itineraries-div">
        
        <BurgerMenu />
        
        <h1>SAFFIRE</h1>

        <h3>MY ITINERARIES</h3>

        <div className = "saffire-all-itineraries-container">
          {
            toRenderItins.map(itin => (
            
            <div className = "saffire-all-itineraries-item" key={itin.key}>
            <img src={itin.imageURL} />
            

              <div className = "little-saffire-item" key={itin.key}>
                <span className = "sapphire-itin-name-x" onClick={() => { 
                firebase.database().ref(`/itineraries/${itin.key}`).once('value')
                .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin.key))
                .then(() => this.props.history.push(`/itinerary/${itin.key}`))
                }}>{itin.name}</span>
                <span className = "sapphire-itin-name-y">10 Aug 2017 - 15 Aug 2017</span>
                <span className = "sapphire-itin-name-z"> <i className="fa fa-user" aria-hidden="true"></i>{this.props.currentUser.friends !== undefined ? Object.keys(this.props.currentUser.friends).length + " Friend" : "0 Friend"}</span>
                <span className = "little-saffire-item" onClick={() => this.props.history.push(`/ideaboard/${itin.key}`)}>IDEA BOARD</span>
              </div>

            </div>
            ))
          }
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

      setItineraryName(itineraryName) {
          dispatch(postItinerary(itineraryName))
      },

      setCurrentItinerary(itinerary, itin) {
        dispatch(setCurrentItinerary(itinerary, itin))
      },
      getCurrentUser() {
        dispatch(getCurrentUser())
    }
    // Get all itineraries, put them on state, 
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllItineraries))
