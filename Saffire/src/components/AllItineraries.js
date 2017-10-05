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
    // const ref = firebase.database().ref()                                                     // Gets a reference to the firebase database
    // let itinArray = []
    // let memberArray = []
    // ref.on('value', snapshot => {                                                             // Searches through the database
    //   let itinObj = snapshot.val().itineraries                                                // Sets a reference to the itineraries model
    //     for (var key in itinObj) {                                                            // Loops through each instance in the itineraries model
    //       if (itinObj[key].members) {                                                         // Goes into the loop only when there are members of the itinerary
    //         for (var innerKey in itinObj[key].members) {                                      // Loops through the members object for that instance of the itineraries object
    //           console.log('INSIDE LOOP: INNER KEY: ', innerKey, ' MEMBER: ',  itinObj[key].members[innerKey], ' CURRENT USER KEY: ', this.props.currentUser.key )
    //           memberArray.push(itinObj[key].members[innerKey].key)
    //         }
    //       }
          
    //     }
    //   console.log('MEMBERS: ', memberArray)   
    //   let memberKeys = []
    //   for (var i = 0; i < memberArray.length; i++) {
    //     memberKeys.push(memberArray[i].key)
    //   }  
    //   console.log(itinObj)
    //   for (var prop in itinObj) {
    //     if (firebase.auth().currentUser === null) {
    //       alert('Please Login')
    //       this.props.history.push('/');
    //       break;
    //     }
    //     else if (itinObj[prop].owner === firebase.auth().currentUser.email || memberKeys.includes(this.props.currentUser.key))
    //     itinArray.push(prop)
    //   }
    //   this.setState({itinArray: itinArray})
    // }, error => console.log(error.code))
    const ref = firebase.database().ref()
    let itinArray = []
    ref.on('value', snapshot => {
      let allItins = snapshot.val().itineraries
      for (var key in allItins) {
        let toAdd = allItins[key]
        toAdd.key = key
        itinArray.push(toAdd)      
      }
      console.log('ALL ITINS: ', itinArray)
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
            
            <div className = "saffire-col-4 saffire-all-itineraries-item">
              <img src={itin.imageURL} style={{width: 300, height: 200}} />
             {/* {
               itin.imageURL && 
               <img src ={`${itin.imageURL}`} /> } */}
              <div className = "little-saffire-item" key={itin.key} onClick={() => { 
                firebase.database().ref(`/itineraries/${itin.key}`).once('value')
                .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin.key))
                .then(() => this.props.history.push('/money'))
                }}>
                
                <span className = "sapphire-itin-name-x">{itin.name}</span>
                <span className = "sapphire-itin-name-y">10 Aug 2017 - 15 Aug 2017</span>
                <span className = "sapphire-itin-name-z"> 8 Friends</span>
                
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
