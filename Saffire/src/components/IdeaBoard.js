import React, {Component} from 'react';
import {connect} from 'react-redux';
import LinkPreview from './LinkPreview'
//import { postIdea } from '../actions';


class IdeaBoard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newURL: '',
            
        }
    }

    handleChange(e) {
        let url = e.target.value
        this.setState({
            newURL: url
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        
    }
    

    render() {
        let handleSubmit = this.handleSubmit;
        let handleChange = this.handleChange;
        let itineraryName = this.props.itineraryName
        return (
        <div>
            <h2>Title of Itinerary</h2>
            <h3>Put your ideas here!</h3>
            <div className="form-group">
                <form onSubmit={handleSubmit} className="itinerary-form">
                    <input className="urlForm" 
                        type="url" 
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter a URL"
                        value={this.state.newURL}/>
                        
                    <button type="submit" className="btn btn-primary">Enter</button>
                </form>
            <LinkPreview />

            </div>
            <p>Left arrow: <i class="arrow left"></i></p>
            <p>Right arrow: <i class="arrow right"></i></p>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const IdeaBoardContainer = connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
export default IdeaBoardContainer;