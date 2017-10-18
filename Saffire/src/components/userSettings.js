import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateUser} from '../actions';
import BurgerMenu from './Menu';


class UserSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: '',
            newEmail: '',
            newPassword: '',
            currentName: ''
        }
        this.nameUpdate = this.nameUpdate.bind(this);
        this.emailUpdate = this.emailUpdate.bind(this);
        this.passwordUpdate = this.passwordUpdate.bind(this);
        this.settingUpdate = this.settingUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({currentName: this.props.currentUser.name ? this.props.currentUser.name : null});
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
        if(!newName) newName = this.props.currentUser.name;
        if(!newEmail) newEmail = this.props.currentUser.newEmail;
        this.props.getUpdatedUser(newName, newEmail, newPassword, userID)
    }

    handleSubmit(evt){
        evt.preventDefault()
        return this.settingUpdate(this.state.newName, this.state.newEmail, this.state.newPassword, this.props.currentUser.key)
    }

    render () {
            return (
                <div className = "saffire-user-settings-div">
                    <BurgerMenu />


                    <h1>SAFFIRE</h1>
                    
                    <div className = "saffire-profile-div">
                        <h3>MY PROFILE</h3>
                        
                        <p>
                            <span className = "saffire-label">NAME:</span>
                            <span className = "saffire-user-information">{this.props.currentUser.name}</span>
                        </p>

                        <p>
                            <span className = "saffire-label">EMAIL:</span>
                            <span className = "saffire-user-information">{this.props.currentUser.email}</span>
                        </p>
                    </div>

                    <div className = "saffire-user-setting-change-div">
                        <form className = "saffire-user-setting-form" onSubmit = {this.handleSubmit}>
                            <label>NAME:</label><input type ="text" name = "username" onChange = {this.nameUpdate} placeholder = "name"/>
                            <br />
                            <label>EMAIL:</label><input type = "email" name = "email" onChange = {this.emailUpdate} placeholder = "email"/>
                            <br />
                            <label>PASSWORD:</label><input type = "password" name = "password" onChange = {this.passwordUpdate} placeholder ="password"/>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
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
