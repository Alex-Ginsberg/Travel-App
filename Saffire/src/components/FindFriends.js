import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUsers, addFriend, sendFriendRequest } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class FindFriends extends Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        console.log('ALL USERS: ', this.props.users)
        return (
        <div>
            <h1>Find Friends!</h1>
            {this.props.users.map(user => (
                <div key={user.key}>
                    <img src={user.image} style={{height: 50, width: 50}}/>
                    <h3>{user.name}</h3>
                    <button onClick={() => this.props.sendFriendRequest(this.props.currentUser, user)}>Send Friend Request</button>
                </div>
            ))}
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
        fetchUsers() {
            dispatch(fetchUsers())
        },
        addFriend(friend) {
            dispatch(addFriend(friend))
        } ,
        sendFriendRequest(user, friend) {
            dispatch(sendFriendRequest(user, friend))
        }
    }
}

const FindFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FindFriends);
export default FindFriendsContainer;