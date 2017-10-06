import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Navbar from './navbar';
import history from '../history';
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

   async handleSubmit(e) {
        e.preventDefault()
        let newItinerary = this.state.newItinerary
        const itineraryImageURL = this.getDestination(newItinerary);
        this.props.setItineraryName(newItinerary, itineraryImageURL)
   
    }
    
    
    
    
    getDestination(userInputDesination) {
        const destinationImages = {
            'australia': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/australia%20.jpg?alt=media&token=242bfd34-a4a8-4f25-9522-b4caca748525',
            'california': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/california.jpg?alt=media&token=cd543132-ea5e-4e4e-9f6b-de62dc245df5',
            'carribean': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/carribean.jpg?alt=media&token=60409994-f462-450f-a544-20a52246a20f',
            'hawaii': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/hawaii.jpg?alt=media&token=acd8b82e-248d-42f5-b3d2-517d9c25b7e2',
            'iceland': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/iceland.jpg?alt=media&token=e7a88f00-6e66-4ca6-94ec-ce968487d382',
            'japan': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/japan.jpg?alt=media&token=8266c108-69a3-4593-a1d4-2f3cb04f0693',
            'kyoto': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/kyoto.jpg?alt=media&token=13591e26-83f6-4ae4-8527-7b963cd427b2',
            'london': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/london.jpg?alt=media&token=ec5ee0e9-dbd9-4f3f-bc1f-1b2ce5669f67',
            'los angeles': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/los-angeles.jpeg?alt=media&token=3b813964-16ac-44f7-974c-0d15988f417e',
            'melbourne': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/melbourne.jpg?alt=media&token=194f12a5-53ca-4868-a568-7f1fda1247c7',
            'osaka': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/melbourne.jpg?alt=media&token=194f12a5-53ca-4868-a568-7f1fda1247c7',
            'paris': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/paris.JPG?alt=media&token=22b38ce7-1465-4e23-a65c-fe787e6ac809',
            'san francisco': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/san-francisco.jpg?alt=media&token=ec1b5c56-776b-4fc9-8b83-051cae0f8c38',
            'sydney': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/sydney.jpg?alt=media&token=0f360a1a-89c4-405c-a3e0-d060eb01568e',
            'tokyo': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/tokyo.jpg?alt=media&token=b2af930b-99c3-4bc7-8e4f-653d38d85bbd',
            // 'new york': ,
            // 'chicago': ,
            'spain': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/spain.jpg?alt=media&token=c95d8cca-6c90-4c7d-a122-be95772a1a4b',
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
        const dest = userInputDesination.toLowerCase().trimRight();
        // const search = dest.match(/something/i);
        // console.log('searchhh', search);


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
  
        setItineraryName(itineraryName, itineraryImageURL) {
            dispatch(postItinerary(itineraryName, itineraryImageURL))
        },
        getCurrentUser() {
            dispatch(getCurrentUser())
    }
  }
}

const WhereToContainer = connect(mapStateToProps, mapDispatchToProps)(WhereTo);
export default WhereToContainer;