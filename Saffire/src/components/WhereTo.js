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
        if (this.props.currentUser.email){
            let newItinerary = this.state.newItinerary
            const itineraryImageURL = this.getDestination(newItinerary);
            this.props.setItineraryName(newItinerary, itineraryImageURL)
        }
        else {
            history.push('/signup')
        }
    }


    
    
    
    getDestination(userInputDesination) {
        const destinationImages = {
            'australia': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/australia%20.jpg?alt=media&token=242bfd34-a4a8-4f25-9522-b4caca748525',
            'california': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/california.jpg?alt=media&token=cd543132-ea5e-4e4e-9f6b-de62dc245df5',
            'carribbean': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/carribean.jpg?alt=media&token=60409994-f462-450f-a544-20a52246a20f',
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
            'new york city': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fnew-york-city.jpg?alt=media&token=31bbab4d-1c37-4052-82ac-dff4a09d3cc4',
            'chicago': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fchicago.jpg?alt=media&token=aac1af7f-c85f-473c-9b75-2daa292b013b',
            'spain': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/spain.jpg?alt=media&token=c95d8cca-6c90-4c7d-a122-be95772a1a4b',
            'madrid': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fmadrid.jpg?alt=media&token=7c847153-9c6b-40d3-b34d-4b06ca97c9e7',
            'barcelona': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fbarcelona.jpg?alt=media&token=c1f00d16-dee5-4d77-8514-bfecb0d7f414',
            'hong kong': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fhong-kong.jpg?alt=media&token=2978c900-1a9e-46c6-a0ae-2784627dadfa',
            'berlin': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fberlin.jpg?alt=media&token=bc336f1f-a398-457f-9fe7-388e2b03834b',
            'new zealand': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fnew-zealand.jpg?alt=media&token=7d0a4555-75b7-474f-ad33-7b2bc3c47d41',
            'italy': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fitaly.jpg?alt=media&token=b8960bb8-f995-4ecb-b15f-c825cfdd28de',
            'camping': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fcamping.jpg?alt=media&token=a9395919-207c-4671-a86a-248499767219',
            'hiking': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fhiking.jpg?alt=media&token=096536bc-1d68-42d9-aa48-027de4cc038e',
            'singapore': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fsingapore.jpg?alt=media&token=f78ec0ae-914f-45ee-a3bc-798a61457bde',
            'ski trip': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fskiing.jpg?alt=media&token=06dd49a7-c2c1-4db9-9bb9-fd0625e1a9c6',
            'skiing': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fski-trip.jpeg?alt=media&token=26176f61-7894-46f4-a5c0-b59167353c4d',
            'snowboarding': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fsnowboarding.jpg?alt=media&token=2c18df45-7d53-4c24-8dc0-b3a4a300595e',
            'beach': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fbeach-trip.jpg?alt=media&token=ca6c687b-3876-4d77-b429-e6e8e02e95bd',
            'wedding': 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fset%201%2Fwedding.jpeg?alt=media&token=dc950854-8197-4e86-baa3-c35886f5950f',
        
        }

        const generalImages = {
            0: 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fgeneral%20travel%20photos%2Ftravel1.jpeg?alt=media&token=570c023d-19e1-445b-8fb7-adc8e67204cd',
            1: 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fgeneral%20travel%20photos%2Ftravel2.jpeg?alt=media&token=7a4c26d7-6f63-4d3f-b3da-4e776651c574',
            2: 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fgeneral%20travel%20photos%2Ftravel4.jpg?alt=media&token=87ce13a4-5f94-4b82-b977-3ae398e9949b',
            3: 'https://firebasestorage.googleapis.com/v0/b/deets-76612.appspot.com/o/destination%20photos%2Fgeneral%20travel%20photos%2Ftravel5.jpg?alt=media&token=52d6bdbf-6eac-4270-a0e6-aae8b788d3b0',
        }

        //user input: 
        const dest = userInputDesination.toLowerCase().trimRight();

        if (destinationImages[dest] !== undefined) {
            return destinationImages[dest]

        } else {
            //pick and return random general travel photo
            const objectLength = Object.entries(generalImages).length;
            const randomNum = Math.floor((Math.random() * (objectLength - 0 ) + 0));
            return generalImages[randomNum];
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