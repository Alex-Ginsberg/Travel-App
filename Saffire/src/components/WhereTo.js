import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
import { postItinerary, getCurrentUser } from '../actions';



class WhereTo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDestination = this.getDestination.bind(this);
        this.state = {
            newItinerary: '',
            dirtyItinerary: false,
            imageURL: '',
        }

    }

    componentDidMount() {
        // this.props.getCurrentUser() 
    }

    handleSubmit(e) {
        e.preventDefault()
        let newItinerary = this.state.newItinerary

        const itineraryImageURL = this.getDestination(newItinerary);
        console.log('yes******', itineraryImageURL)
        this.setState({imageURL: itineraryImageURL})

        // this.props.setItineraryName(newItinerary) 
    }

    
    
    
    
    
    
    getDestination(userInputDesination) {
        const destinationImages = {
            'australia': '/assets/destination-images/australia.jpg',
            'california': '/assets/destination-images/california.jpg',
            'carribean': '/assets/destination-images/carribean.jpg',
            'hawaii': '/assets/destination-images/hawaii.jpg',
            'iceland': '/assets/destination-images/iceland.jpg',
            'japan': '/assets/destination-images/japan.jpg',
            'kyoto': '/assets/destination-images/kyoto.jpg',
            'london': '/assets/destination-images/london.jpg',
            'los angeles': '/assets/destination-images/los-angeles.jpg',
            'melbourne': '/assets/destination-images/melbourne.jpg',
            'osaka': '/assets/destination-images/osaka.jpg',
            'paris': '/assets/destination-images/paris.jpg',
            'san-francisco': '/assets/destination-images/san-francisco.jpg',
            'sydney': '/assets/destination-images/sydney.jpg',
            'tokyo': '/assets/destination-images/tokyo.jpg',
            // 'new york': ,
            // 'chicago': ,
            'spain': '/assets/destination-images/spain.jpg',
            // 'madrid': ,
            // 'italy': ,
            // 'argentina': ,
            // 'camping':,
            // 'hiking':,
            // 'skiing',
            // 'ski trip',
            // 'snowboarding',
            // 'beach',
            // 'wedding',
        
        }

        //user input: 
        const dest = userInputDesination.toLowerCase();
        if (destinationImages[dest] !== undefined) {
            return destinationImages[dest]
        } else {
            //pick and return random general travel photo 
        }
    }

    

    render() {
        let handleSubmit = this.handleSubmit;
        const imageStr = this.state.imageURL;

        return (

            <div className="sapphire-itinerary-div">

                
            {/* <img src={require(`${imageStr}`)} style={{width: 300, height: 250}}> */}

                <form onSubmit={handleSubmit} className="sapphire-itinerary-form">
                    
                    <label id = "home-page-label">Start Your Adventure</label>
                    <input name="itineraryName" 
                        type="text" 
                        className="form-control" 
                        placeholder="Itinerary Name"
                        onChange={(e) => {this.setState({newItinerary: e.target.value, dirtyItinerary: true})}}/>
                    
                    {(this.state.dirtyItinerary && !this.state.newItinerary.length) && <p className="errorItinerary alert alert-danger" >please enter an itinerary name</p>}

                    <button type="submit" className="btn btn-primary">Go</button>
                </form>
                {/* <span>{this.props.itineraryName}</span> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
  
        setItineraryName(itineraryName) {
            dispatch(postItinerary(itineraryName))
        },
        getCurrentUser() {
            dispatch(getCurrentUser())
    }
  }
}

const WhereToContainer = connect(mapStateToProps, mapDispatchToProps)(WhereTo);
export default WhereToContainer;