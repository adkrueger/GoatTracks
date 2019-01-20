import React, {Component} from 'react';
import firebase from "./Firestore";
import locationsRef from "@material-ui/core/es/styles/multiKeyStore";
import {Link} from "react-router-dom";


class Events extends Component {
    constructor() {
        super();
        this.state = {
            eventData: [],
            locationData: [],
        }
    }

    componentDidMount() {
        let currentComponent = this;
        //Load Firebase Stuff
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: false};
        firestore.settings(settings);

        //Load Location or Path for Query
        const db = firebase.firestore();
        const compRef = db.collection("events").doc(this.props.match.params.id);

        let ccData = [];
        //Query Data
        compRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                let newEvent = {
                    "id": doc.id,
                    "name": doc.data().name,
                    "description": doc.data().description,
                    "location": doc.data().location,
                    "attending": doc.data().attending,
                    "image": doc.data().image
                };
                ccData = newEvent;
                console.log(newEvent);
                currentComponent.setState({eventData: ccData});

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        console.log(this.state.eventData)
    }

    render() {
        return (
            <div className="mainContent">
            <div className="eventBGI">
                            <p><img src={this.state.eventData.image}/></p>
                            <div className="overlayEvent"></div>
                        </div>

                        <h1 className="eventTitle">{this.state.eventData.name}</h1>
                <div className="row">
                <div className="col-sm-1">
                </div>
                    <div className="col-sm-4">

                        <br/>
                        
                        <br/>
                        <br></br><br></br>
                        <br></br><br></br>
                        
                        <h3 className="eventAttendees">{this.state.eventData.attending} people are attending</h3>
                        <h3 className="attendQuestion">Will you be attending as well?</h3>
                        <button className="attendingButton">YES</button>
                        <span>    </span>
                        <button className="attendingButton">NO</button>
                        
                        
                    </div>
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-4">
                        <br/>
                        <br/>
                        <br></br><br></br>
                        <br></br><br></br>
                        <h3 className="eventDesc">{this.state.eventData.description}</h3>
                        <br/>
                        <br></br><br></br>
                        <Link to={'/location/'+ this.state.eventData.location}>
                            <div className="eventLocation">
                                This event is held at: {this.state.eventData.location}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;