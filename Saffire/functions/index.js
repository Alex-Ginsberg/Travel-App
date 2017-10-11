'use strict'

const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({origin: true});

// const {googlePlacesKey} = require("../src/secrets");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.helloWorld = functions.https.onRequest((request, response) => {
    const placeid = request.query.placeid;


    cors(request, response, () => {
        axios.post(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=AIzaSyDbYGkMDYAvdaL7nkulnWnkP70FP83tkdM`)
            .then(res => res.data)
            .then(result => {
                const simplifiedResult = Object.assign({}, {
                    name: result.result.name,
                    openingHours: result.result.opening_hours,
                    photos: result.result.photos,
                    placeID: result.result.place_id,
                    priceLevel: result.result.price_level,
                    rating: result.result.rating,
                    vicinity: result.result.vicinity,
                    website: result.result.website,
                    reviews: result.result.reviews
                })
             
                response.json(simplifiedResult);
            })
            .catch(err => console.log(err));
    })

});



