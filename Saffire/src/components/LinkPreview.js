import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {newLike, confirmEvent, fetchEvents, sendComment} from '../actions'
import firebase from '../firebase'

class LinkPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: false,
      currentComment: '',
      comments: {},
      newComments: [],
    }
    this.submitComment = this.submitComment.bind(this)
  }

  submitComment(e) {
    e.preventDefault()
    this.props.sendComment(this.props.itinKey, this.props.eventKey, this.props.user, this.state.currentComment)
    this.setState({currentComment: ''})
  }

  componentDidMount(){
    this.setState({comments: this.props.comments})
  }

  render () {
    let initialDataLoad = false
    if (this.props.eventKey && this.props.itinKey) {
      const commentRef = firebase.database().ref().child('itineraries').child(this.props.itinKey).child('events').child(this.props.eventKey).child('comments')
      commentRef.on('child_added', snapshot => {
        if (initialDataLoad){
          initialDataLoad = false
          const commentArray = []
          const newComment = snapshot.val()
          if (this.state.newComments.length > 0) {
            const oldComments = this.state.newComments
            const oldBodies = []
            oldComments.map(comment => oldBodies.push(comment.body))
            if (oldBodies.indexOf(newComment.body) === -1){
              oldComments.push(newComment)
            }
            this.setState({newComments: oldComments})
          }
          else if(this.state.comments){
            Object.keys(this.state.comments).map(key => {
              commentArray.push(this.state.comments[key])
            })
            commentArray.push(newComment)
            this.setState({newComments: commentArray})
          }
          else{
            commentArray.push(newComment)
            this.setState({newComments: commentArray})
          }
          
          
        }
      })
      commentRef.once('value', snapshot => {
        initialDataLoad = true
      })
    }



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
              FRIENDS GOING: {likedByArray}
          </div>


        <div className="link-buttons">
          {!this.props.hasBeenAdded && <div className="linkpreview-hover" label={`Like ${this.props.likes}`} onClick={() => this.props.newLike(this.props.eventKey, this.props.itinKey)} disabled={((likedByArray.indexOf(this.props.user.email)) > -1) || !this.props.connect}>JOIN EVENT</div>}
            {(!this.props.hasBeenAdded && this.props.isOwner) && <div className="linkpreview-hover" label="Add To Itinerary" disabled={!this.props.connect} onClick={() => this.props.confirmEvent(this.props.eventKey, this.props.itinKey) }> ADD TO ITINERARY </div>}
          {(!this.props.hasBeenAdded && this.props.isOwner) && <div className="linkpreview-hover" label="Remove" onClick={() => {
            firebase.database().ref().child('itineraries').child(this.props.itinKey).child('events').child(this.props.eventKey).remove()
            this.props.fetchEvents(this.props.itinKey, true)
            }}
          >REMOVE</div> }
          {!this.props.hasBeenAdded && <div className="linkpreview-hover" disabled={!this.props.connect} onClick={() => this.setState({showComments: !this.state.showComments})}> Comments </div>}
          
        </div>
        {this.state.showComments && 
          <div className="ideaboard-comments">
            {(this.state.comments && !this.state.newComments.length) && Object.keys(this.state.comments).map(key => (
              <p key={key}>{this.state.comments[key].sender}: {this.state.comments[key].body}</p>
            ))}
            {(this.state.newComments.length > 0) && this.state.newComments.map((comment, index) => (
              <p key={index}>{comment.sender}: {comment.body}</p>
            ))}
            <form onSubmit={this.submitComment}>
            <input className="idea-form-control"
              type="text"
              value={this.state.currentComment}
              onChange={(e) => this.setState({currentComment: e.target.value})}
              placeholder="Leave a comment..."/>
              <button type="submit" className="idea-button" >Send</button>
            </form>
          </div>
        }
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
    },
    sendComment(itinKey, eventKey, currentUser, body){
      dispatch(sendComment(itinKey, eventKey, currentUser, body))
    }
  }
}

const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
export default LinkPreviewContainer;