import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUsers, addFriend } from '../actions';
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
                <h3 onClick={() => this.props.addFriend(user)}>{user.name}</h3>
            ))}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers() {
            dispatch(fetchUsers())
        },
        addFriend(friend) {
            dispatch(addFriend(friend))
        } 
    }
}

const FindFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FindFriends);
export default FindFriendsContainer;