import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';

console.log('home component')

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newItinerary: '',
            dirtyItinerary: false,
        }
    }

    handleChange(e) {
        let title = e.target.title;
        this.setState({
            newItinerary: title,
            dirtyItinerary: true
        })
    }

    handleSubmit(e) {
        e.preventDefault()

    }

    render() {
        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;

        return (
            <form onSubmit={handleSubmit} className="itinerary-form">
            <div className="form-group">
                <label>Itinerary</label>
                <input name="itinerary" 
                       value={this.state.newItinerary} 
                       onChange={handleChange} 
                       type="url" 
                       className="form-control" 
                       placeholder="Enter Your Itinerary Name" />
                {this.state.dirtyItinerary && !this.state.newEmailEntry.length ? 
                    <p className="errorItinerary alert alert-danger" >please enter an itinerary name</p> :
                    <p></p>
                }
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.newItinerary}>Enter</button>
        </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

}

const mapDispatchToProps = (dispatch, ownProps) => {

}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;