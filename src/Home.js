import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';  

import { Link } from "react-router-dom";


import shouldPureComponentUpdate from 'react-pure-render/function';
import Annotation from './my_great_place.jsx';


const mapOptions = {
    styles: [
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#6e3a35"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "color": "#6e3a35"
                },
                {
                    "saturation": "0"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#efebea"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#af9d94"
                },
                {
                    "saturation": "0"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ff0000"
                },
                {
                    "saturation": "34"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "lightness": "60"
                },
                {
                    "gamma": "1.00"
                },
                {
                    "hue": "#ff0000"
                },
                {
                    "saturation": "-90"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "hue": "#ff0000"
                },
                {
                    "weight": "0.01"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bfb1a9"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#bfb1a9"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                },
                {
                    "saturation": "-90"
                },
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1.00"
                },
                {
                    "weight": "1"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#d2cac7"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5a524f"
                },
                {
                    "saturation": "0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ] // straight out of something like snazzymaps
};

class Home extends Component {

    static defaultProps = {
        center: {
          lat: 42.2746,
          lng: -71.8063
        },
        zoom: 18
    };

    constructor() {
        super();
    
        this.state = {
           name: '',
           locations: []
        }
    }
    

    shouldComponentUpdate = shouldPureComponentUpdate;


    componentDidMount() {
  
        let currentComponent = this;
        //Load Firebase Stuff
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: false};
        firestore.settings(settings);
    
        //Load Location or Path for Query
        const db = firebase.firestore();
        const compRef = db.collection("locations");
    
        var ccData = []
        //Query Data
        compRef.get().then(function(querySnapshot) {

          querySnapshot.forEach(function(doc) {

             let type;
             let locName = doc.data().name;
             let typeImg = "";

              if (locName.includes("Alpha") || locName.includes("Sigma") || locName.includes("Phi") ||
                  locName.includes("Tau") || locName.includes("Theta") || locName.includes("Zeta")){
                  type = "Greek"
                  typeImg = "domain"
              } else if ((locName.includes("Hall") && !(locName.includes("Boynton") || locName.includes("Goddard") ||
                  locName.includes("Kaven") || locName.includes("Olin") || locName.includes("Stratton"))) ||
                  locName.includes("Apartment") || locName.includes("Elbridge") || locName.includes("Schussler") ||
                  locName.includes("Stoddard") || locName.includes("Trowbridge") || locName.includes("Salisbury") ||
                  locName.includes("Faraday")){
                  type = "Residence Hall"
                  typeImg = "people"
              } else if (locName.includes("Hughes") || locName.includes("Jeppson") || locName.includes("Skull") ||
                  locName.includes("Power House")){
                  type = "Other"
                  typeImg = "location_city"
              } else if (locName.includes("Laboratories") || locName.includes("Hall") || locName.includes("Alden") ||
                  locName.includes("Gateway Park") || locName.includes("Washburn") || locName.includes("Life Sciences")){
                  type = "Education"
                  typeImg = "school"
              } else {
                  type = "Other"
                  typeImg = "location_city"
              }

              let newProg = { 
                "id": doc.id,
                "name": doc.data().name, 
                "lat": doc.data().coords.latitude,
                "lon": doc.data().coords.longitude,
                "image": doc.data().image,
                "type": type,
                "typeImg": typeImg,
                "showing": false
              };
              ccData.push(newProg)
              console.log(newProg)
          });
          currentComponent.setState({ locations: ccData });    

        });    

        console.log(this.state.locations)

      }


    render() {
      return (
      <div className="mainContent">
      

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB3mad1jG68mBLiQaNSiqu8muGTPog9Wag" }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                options={mapOptions}
                >
        

                 {this.state.locations.map(function(anno, idx){
                    return (
                         <Annotation post={anno} lat={anno.lat} lng={anno.lon} text={anno.name} tyImg={anno.typeImg} tyProImg={anno.image}>

                         </Annotation> 
                      
                    );
                  })}


                </GoogleMapReact>



          </div>
            
      </div>
      );
    }
}

export default Home;