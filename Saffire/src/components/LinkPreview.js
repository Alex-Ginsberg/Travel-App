import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {newLike, confirmEvent, fetchEvents, sendComment, googlePlacesDetails} from '../actions'
import firebase from '../firebase'
import SkyLight from 'react-skylight';

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
      const placeID = this.props.placeID

      console.log('LINK PREVIEW PLACEID ', placeID)
      const myBigGreenDialog = {
          width: '70%',
          height: '700px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          marginTop: '-350px',
          marginLeft: '-35%',
          backgroundColor: '#fff',
          borderRadius: '2px',
          zIndex: 100,
          padding: '15px',
          boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
          'transition-duration' : '400ms',
          overflow: 'auto'
      };

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
            console.log(oldComments)
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
          <div className="link-all-info" >

        <div className="link-title" onClick={async () => {
            await this.props.getGoogleDeets(placeID)
            await this.simpleDialog.show()
        }}>
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


            <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={this.props.googleDetails.name} transitionDuration={100} >
              <section className="google-details-main">

                  { this.props.googleDetails.photos &&

                  <section id="photos">
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[0].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[1].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[2].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[3].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[4].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.props.googleDetails.photos[5].photo_reference}&sensor=false&maxheight=600&maxwidth=600&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`}></img>
                  </section>
                  }


                <div className="google-details-info">
                    {this.props.googleDetails.openingHours && this.props.googleDetails.openingHours.open_now ? 'OPEN NOW' : '' }

                  <div className="google-details-openingHours">
                      {this.props.googleDetails.openingHours && this.props.googleDetails.openingHours.weekday_text ?
                          this.props.googleDetails.openingHours.weekday_text.map(day => {
                              return <span>{day}</span>
                          })
                          :
                          ''
                      }
                  </div>
                  <span><a href={this.props.googleDetails.website}>{this.props.googleDetails.website}</a></span>
                  <h4>Rating {this.props.googleDetails.rating}</h4>




                  <h3 className="details-locationnear">{this.props.googleDetails.name} is located near {this.props.googleDetails.vicinity}</h3>





                  <div className="google-details-reviews">
                      { this.props.googleDetails.reviews &&

                      this.props.googleDetails.reviews.map(review => {
                          return (<div className="google-individual-review">
                            <p>Rating {review.rating}</p>
                            <p>{review.text}</p>
                            <p>{review.author_name}</p>
                          </div>)
                      })

                      }
                  </div>




                </div>

              </section>
            </SkyLight>






          </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connect: state.connect,
      googleDetails: state.googleDetails,
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
    },
      getGoogleDeets (placeID) {
          dispatch(googlePlacesDetails(placeID))
      }
  }
}

const LinkPreviewContainer = connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
export default LinkPreviewContainer;