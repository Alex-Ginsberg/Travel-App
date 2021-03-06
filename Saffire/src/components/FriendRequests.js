import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFriend } from '../actions'


class FriendRequests extends Component {

    render() {
        let requests = this.props.currentUser.requests
        let requestsArr = []
        for (var key in requests) {
            requestsArr.push({email: requests[key].from, key: requests[key].userKey, name: requests[key].name, reqKey: key})
        }
      
        return (
            <div className = "saffire-friend-requests-div">
                <h2 className="friend-request-title">FRIEND REQUESTS</h2>
                <div>
                    {requestsArr.map(request => (
                        <div key={request.key} className="friend-request">
                            <h3 className="friend-request-info">You have a friend request from {request.email}</h3>
                            <button onClick={() => {this.props.addFriend(this.props.currentUser, request)}}>Accept</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriend(user, friend) {
            dispatch(addFriend(user, friend))
        }
    }
}

const FriendRequestsContainer = connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
export default FriendRequestsContainer;