import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import BurgerMenu from './Menu'
import FriendRequests from './FriendRequests'
import FindFriends from './FindFriends'
import {removeNotification} from '../actions'
let toonAvatar = require('cartoon-avatar')


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
        Object.keys(this.props.user.notifications).forEach(currentKey => {
            notificationArray.push(this.props.user.notifications[currentKey])
        })
    }
    return (
      <div className="saffire-friends-container">
        <BurgerMenu />
        <h1>SAFFIRE</h1>

        <div className="saffire-friends-column-8 clearfix">
            <h2>MY FRIENDS</h2>
            <div className = "saffire-friends-little-wrapper">
                {friends.map(friend => {
                    return (
                        <div className = "saffire-friend-item">
                            <img src={toonAvatar.generate_avatar()} alt="avatar"/>
                            <div className="friend-align">
                                <p>{this.props.currentUser[friend].name}</p>
                                <p>{this.props.currentUser[friend].email} </p>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>


        <div className="sapphire-friends-column-4 clearfix">
            <FindFriends />
            {notificationArray.length > 0 &&
                <div className = "sapphire-friends-notification-div">
                    <h3>MY NOTIFICATIONS</h3>
                    {notificationArray.map(notification => (
                        <p onClick={() => this.props.removeNotification(this.props.user, notification.body)}>{notification.body}</p>
                    ))}
                </div>
            }
            <FriendRequests />
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