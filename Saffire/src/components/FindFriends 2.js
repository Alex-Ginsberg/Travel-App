import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUsers, addFriend, sendFriendRequest, searchForUser } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class FindFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount() {
        this.props.fetchUsers()
    }

    handleChange(event) {
        let search = event.target.value;
        this.setState({search: search});
    }

    handleSubmit(event) {
        event.preventDefault();
        const searchEmail = this.state.search;
        this.props.search(searchEmail);

        //search for user email

        //display notice if user not found
    }

    requestBox(searchUser) {
        const searchUser = this.state.searchUser;

        if (searchUser) {
            return (
                <div className="find-friends-container">
                    {this.state.searchUser.map(user => (
                        <div>
                            <h3>{user.name}</h3>
                            <button onClick={() => this.props.sendFriendRequest(this.props.currentUser, this.state.searchUser)}>Send Friend Request</button>
                        </div>
                    ))}
                </div>
            )
        }
    }

    render() {
        // const users = this.props.users;

        return (
        <div className="find-friends-container">
            <h1>Find Friends!</h1>

            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="enter email" className="form-control" onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-primary">SEARCH</button>

                </form>
            </div>

            {this.state.searchUser &&


            }


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
        },

        search(searchEmail) {
            dispatch(searchForUser(searchEmail))
        },
    }
}

const FindFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FindFriends);
export default FindFriendsContainer;