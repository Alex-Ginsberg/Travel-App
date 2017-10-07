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
            'australia': 'https://cdn.stocksnap.io/img-thumbs/960w/4P7RQ1W2CF.jpg',
            'california': 'https://cdn.stocksnap.io/img-thumbs/960w/2DA5SJT6TT.jpg',
            'carribean': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/carribean.jpg?alt=media&token=60409994-f462-450f-a544-20a52246a20f',
            'hawaii': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/hawaii.jpg?alt=media&token=acd8b82e-248d-42f5-b3d2-517d9c25b7e2',
            'iceland': 'https://cdn.stocksnap.io/img-thumbs/960w/FE2EFF7971.jpg',
            'japan': 'https://cdn.stocksnap.io/img-thumbs/960w/UDG5I3DMUP.jpg',
            'kyoto': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/kyoto.jpg?alt=media&token=13591e26-83f6-4ae4-8527-7b963cd427b2',
            'london': 'https://cdn.stocksnap.io/img-thumbs/960w/Q5F4Y33RNK.jpg',
            'los angeles': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/los-angeles.jpeg?alt=media&token=3b813964-16ac-44f7-974c-0d15988f417e',
            'melbourne': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/melbourne.jpg?alt=media&token=194f12a5-53ca-4868-a568-7f1fda1247c7',
            'osaka': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/melbourne.jpg?alt=media&token=194f12a5-53ca-4868-a568-7f1fda1247c7',
            'paris': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/paris.JPG?alt=media&token=22b38ce7-1465-4e23-a65c-fe787e6ac809',
            'san francisco': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/san-francisco.jpg?alt=media&token=ec1b5c56-776b-4fc9-8b83-051cae0f8c38',
            'sydney': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/sydney.jpg?alt=media&token=0f360a1a-89c4-405c-a3e0-d060eb01568e',
            'tokyo': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/tokyo.jpg?alt=media&token=b2af930b-99c3-4bc7-8e4f-653d38d85bbd',
            // 'new york': ,
            // 'chicago': ,
            'spain': 'https://cdn.stocksnap.io/img-thumbs/960w/3595469D4A.jpg',
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
                        disabled={!this.props.connect}
                        onChange={(e) => {this.setState({newItinerary: e.target.value, dirtyItinerary: true})}}/>
                    
                    {(this.state.dirtyItinerary && !this.state.newItinerary.length) && <p className="errorItinerary alert alert-danger" >please enter an itinerary name</p>}

                    <button type="submit" className="btn btn-primary" disabled={!this.props.connect}>Go</button>
                </form>
                {/* <span>{this.props.itineraryName}</span> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itineraryName: state.currentItinerary,
        currentUser: state.currentUser,
        connect: state.connect
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