import React from 'react';
import firebase from '../firebase';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import BurgerMenu from './Menu';
import FriendRequests from './FriendRequests';
import FindFriends from './FindFriends';
import {removeNotification} from '../actions'
let toonAvatar = require('cartoon-avatar');



class MyFriends extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        myFriends: []
    }
  }

  render () {
    let friends = Object.keys(this.props.currentUser !== undefined ? this.props.currentUser: 10)
    const notificationArray = []
    if (this.props.user && this.props.user.notifications){
        Object.keys(this.props.user.notifications).map(currentKey => {
            notificationArray.push(this.props.user.notifications[currentKey])
        })
        console.log('NOTIFICATIONS: ', notificationArray)
    }
    return (
      <div className="saffire-friends-container">
          <div className="friends-header">
            <BurgerMenu />
              <h1>SAFFIRE</h1>
          </div>


          <div className="row">

              <div className="col-lg-8">
                  <div className="my-friends-list">
                  <h1 className = "saffire-friends-title">My Friends</h1>
                    <div className = "saffire-friends-little-wrapper">
                        {
                         friends.map(friend => {
                             return (
                                 <div className = "saffire-friend-item">
                                     <img src = {toonAvatar.generate_avatar()} />
                                        <div className = "friend-align">
                                            <p>{this.props.currentUser[friend].name}</p>
                                            <p>{this.props.currentUser[friend].email} </p>
                                        </div>
                                </div>
                             )
                         })
                        }
                    </div>
                  </div>
              </div>


              <div className="col-lg-3">
                  <div className="saffire-friends-dash-friendUtilities">

                      <div className="find-friend">
                      <FindFriends />
                      </div>
                            {notificationArray.length > 0 && 
                            <div>
                                <h3>Your notifications:</h3>
                                {notificationArray.map(notification => (
                                    <h5 onClick={() => this.props.removeNotification(this.props.user, notification.body)}>{notification.body}</h5>
                                ))}
                            </div>
                            }

                      <div className="friend-requests">
                      <FriendRequests />
                      </div>

                  </div>



              </div>




          </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.friends,
      user: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeNotification(user, body) {
        dispatch(removeNotification(user, body))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFriends))