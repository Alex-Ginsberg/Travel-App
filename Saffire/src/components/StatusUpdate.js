import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateStatus } from '../actions';



class StatusUpdate extends Component {
    constructor() {
        super()
        this.state = {
            showButtons: false
        }
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(status) {
        console.log('CALLING HANDLE UPDATE: ', status)
        this.props.updateStatus(this.props.currentUser, status)
    }

    render() {
        console.log('SHOW: ', this.state.showButtons)
        return (
        <div>
            <button onClick={() => this.setState({showButtons: !this.state.showButtons})}>Update status</button>
            {this.state.showButtons && 
                <div>
                   <button onClick={() => this.handleUpdate('Just landed!')}>Just landed!</button> 
                   <button onClick={() => this.handleUpdate('At the hotel')}>At the hotel</button> 
                   <button onClick={() => this.handleUpdate('Leaving for my next event')}>Leaving for my next event</button> 
                   <button onClick={() => this.handleUpdate('Just finished my event')}>Just finished my event</button> 
                   <button onClick={() => this.handleUpdate('Getting food')}>Getting food</button> 
                   <button onClick={() => this.handleUpdate('Heading home')}>Heading home</button> 
                </div>
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatus(user, status) {
            dispatch(updateStatus(user, status))
        }
    }
}

const StatusUpdateContainer = connect(mapStateToProps, mapDispatchToProps)(StatusUpdate);
export default StatusUpdateContainer;