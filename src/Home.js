import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';

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
          lat: 42.272722,
          lng: -71.809685
        },
        zoom: 11
    };


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
                <Button
                    lat={42.272722}
                    lng={-71.809685}
                    text="My Marker"
                />
                </GoogleMapReact>



          </div>
            
      </div>
      );
    }
}

export default Home;