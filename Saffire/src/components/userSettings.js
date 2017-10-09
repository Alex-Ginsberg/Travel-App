import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCurrentUser, updateUser} from '../actions';
import BurgerMenu from './Menu';


class UserSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: '',
            newEmail: '',
            newPassword: ''
        }
        this.nameUpdate = this.nameUpdate.bind(this);
        this.emailUpdate = this.emailUpdate.bind(this);
        this.passwordUpdate = this.passwordUpdate.bind(this);
        this.settingUpdate = this.settingUpdate.bind(this);
    }
    nameUpdate(event) {
        const newName = event.target.value;
        this.setState({newName : newName});
    }

    emailUpdate(event) {
        const newEmail = event.target.value;
        this.setState({newEmail : newEmail});
    }

    passwordUpdate(event) {
        const newPassword= event.target.value;
        this.setState({newPassword : newPassword});
    }


    settingUpdate(newName, newEmail, newPassword, userID) {
        this.props.getUpdatedUser(newName, newEmail, newPassword, userID)
    }

    render () {
        console.log(this.props.currentUser, "*******")
        console.log(this.state.newName, "1");
        console.log(this.state.newEmail, "2");
        console.log(this.state.newPassword, "3");
        console.log(this.state.updatedUser, "((((((((")
            return (
                <div>
                    <h1>Im here</h1>
                    <form onSubmit = {this.settingUpdate(this.state.newName, this.state.newEmail, this.state.newPassword, this.props.currentUser.key)}>
                        Name: <input name = "username" onChange = {this.nameUpdate}/>
                        <br />
                        Email: <input name = "email" onChange = {this.emailUpdate}/>
                        <br />
                        Password: <input name = "password" onChange = {this.passwordUpdate}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }
    }

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser,
      updatedUser: state.currentUser.newUpdatedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUpdatedUser(newName, newEmail, newPassword, userID) {
        dispatch(updateUser(newName, newEmail, newPassword, userID))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSettings));
