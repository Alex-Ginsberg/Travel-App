// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// //import Navbar from './navbar';
// //import { postIdea } from '../actions';


// const LinkPreview = (props) => {
    
//     return (
//         <h1>LinkPreview component here</h1>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         itineraryName: state.currentItinerary
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
// }

// const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
// export default LinkPreviewContainer;

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {newLike, confirmEvent, fetchEvents} from '../actions'
import firebase from '../firebase'

class LinkPreview extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    let likedByArray = []
    // Will create an array with the emails of everybody who has already liked this event
    // Used to make sure an event can only be liked once
    for (var key in this.props.likedBy) {
      likedByArray.push(this.props.likedBy[key].name)
    }
    return(


      <div className="link-container">
          <div className="link-all-info">

        <div className="link-title">
          <h2>{this.props.title}</h2>


          {/*<img src={this.props.image}  />*/}
        </div>


          <div className="link-info">
              {this.props.description}
          </div>

          <div className="link-likedby">
              Liked by: {likedByArray}
          </div>


        <div className="link-buttons">
          {!this.props.hasBeenAdded && <div label={`Like ${this.props.likes}`} onClick={() => this.props.newLike(this.props.eventKey, this.props.itinKey)} disabled={((likedByArray.indexOf(this.props.user.email )) > -1) || !this.props.connect}> {`LIKE `} </div>}
            {!this.props.hasBeenAdded && <div label="Add To Itinerary" disabled={!this.props.connect} onClick={() => this.props.confirmEvent(this.props.eventKey, this.props.itinKey) }> ADD TO ITINERARY </div>}
          {!this.props.hasBeenAdded && <div label="Remove" onClick={() => {
            firebase.database().ref().child('itineraries').child(this.props.itinKey).child('events').child(this.props.eventKey).remove()
            this.props.fetchEvents(this.props.itinKey, true)
            }}
          >REMOVE</div> }
        </div>

          </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connect: state.connect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newLike(eventId, itinKey) {
      dispatch(newLike(eventId, itinKey))
    },
    confirmEvent(eventId, itinKey) {
      dispatch(confirmEvent(eventId, itinKey))
    },
    fetchEvents(itinKey, bool) {
      dispatch(fetchEvents(itinKey, true))
    }
  }
}

const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
export default LinkPreviewContainer;