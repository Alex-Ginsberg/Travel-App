import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from '../firebase'
import { postItinerary, setCurrentItinerary, getCurrentUser } from '../actions'
import BurgerMenu from './Menu'

class AllItineraries extends React.Component {
  constructor () {
    super()
    console.log('INSIDE ALL Itineraires')
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
          toRenderItins.push(this.state.itinArray[i])
        }
        else if (this.state.itinArray[i].members) {
          for (var key in this.state.itinArray[i].members) {
            if (this.state.itinArray[i].members[key].key === this.props.currentUser.key){
              toRenderItins.push(this.state.itinArray[i])
            }
          }
        }
      }
    }
    
    function allowDrop(event) {
      event.preventDefault();
    }

    function drag(event) {
    
      event.dataTransfer.setData("text", event.target.id);
    }
    
    function drop(event) {
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      event.target.appendChild(document.getElementById(data))
    }

    function allowDrop(event) {
      event.preventDefault();
    }
    return (
      <div className="itin-main">
        <div id="burger">
          <BurgerMenu />
        </div>

        <div className = "sapphire-auth-div">
        <h1 className="app-title">Sapphire</h1>
        </div>
          <div className = "sapphire-idea-board">
            {toRenderItins.map(itin => (
              <button onDragStart = {(event) => drag(event)} draggable = "true" id={itin.key} key={itin.key} onClick={() => {
                firebase.database().ref(`/itineraries/${itin.key}`).once('value')
                  .then(snapshot => this.props.setCurrentItinerary(snapshot.val(), itin.key))
                  .then(() => this.props.history.push('/money'))
                }}>{itin.name}</button>
            ))}
          </div>

          <div onDragOver= {(event) => {allowDrop(event)}} className = "sapphire-event-board" onDrop={(event) => drop(event)}>
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
