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
import {newLike, confirmEvent} from '../actions'
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
      <Card>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia
          overlay={<CardTitle title={this.props.title}/>}
          mediaStyle={{width: 300, height: 300}}
          style={{width: 300}}
        >
          <img src={this.props.image} alt="" />
        </CardMedia>
        <CardActions>
          {!this.props.hasBeenAdded && <FlatButton label={`Like ${this.props.likes}`} onClick={() => this.props.newLike(this.props.eventKey, this.props.itinKey)} disabled={((likedByArray.indexOf(this.props.user.email )) > -1) || !this.props.connect}/> }
          {!this.props.hasBeenAdded && <FlatButton label="Add To Itinerary" disabled={!this.props.connect} onClick={() => this.props.confirmEvent(this.props.eventKey, this.props.itinKey) }/>}
        </CardActions>
        <CardText expandable={true}>
          Liked by: {likedByArray} <br></br>
          {this.props.description}
        </CardText>
      </Card>
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
    }
  }
}

const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
export default LinkPreviewContainer;