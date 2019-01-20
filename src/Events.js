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
            eventPeopleData: 0,
            yourLikeData: null,
            willAttend: false,
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


                const eventsRef = db.collection("eventPeople").where("eventID", "==", ccData.id);
                let eventsRefData = [];
                //Query Data
                eventsRef.get().then(function(querySnapshot) {

                    querySnapshot.forEach(function(doc) {
                        let newProg = { 
                        "eventID": doc.data().eventID,
                        "userID": doc.data().userID, 
                        "userImg": doc.data().userImg,
                        "userName": doc.data().userImg,
                        "uid": doc.id,
                        };
                        eventsRefData.push(newProg)
                    });

                    currentComponent.setState({ eventPeopleData: eventsRefData.length });    
                    
                }); 

                console.log(currentComponent.props.user.uid)
                console.log(ccData.id)

                const youEventsRef = db.collection("eventPeople").where("eventID", "==", ccData.id).where("userID", "==", currentComponent.props.user.uid);
                
                
                //.where("eventID", "==", ccData.id, "&&", "userID", "==", currentComponent.props.user.uid);
                let youEventsRefData = [];
                //Query Data
                youEventsRef.get().then(function(querySnapshot) {
                    console.log(querySnapshot)

                    querySnapshot.forEach(function(doc) {
                        let newProg = { 
                            "eventID": doc.data().eventID,
                            "userID": doc.data().userID, 
                            "userImg": doc.data().userImg,
                            "userName": doc.data().userName,
                            "uid": doc.id,
                        };
                        youEventsRefData.push(newProg)
                        console.log(newProg)
                    });
                    console.log(youEventsRefData)

                    if(youEventsRefData.length > 0){
                        currentComponent.setState({ willAttend:  true});    
                    }else{
                        currentComponent.setState({ willAttend:  false});    
                    }
                    currentComponent.setState({ yourLikeData: youEventsRefData[0] });    

                }); 


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document! are here");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        console.log(this.state.eventData)

    }

    handleSubmitEventAction  = () => {
        let currentComponent = this;



        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: false};
        firestore.settings(settings);
        const db = firebase.firestore();

        var idselected = currentComponent.state.yourLikeData

        if(this.state.willAttend == true){
            console.log(idselected)
            console.log("Not Attending")

            var idSEl = idselected.uid
            console.log(idSEl)

            db.collection("eventPeople").doc(idSEl).delete().then(function() {
                console.log("Document successfully deleted!");
                currentComponent.setState({ yourLikeData: null });    
                currentComponent.setState({ eventPeopleData: currentComponent.state.eventPeopleData - 1 });    

            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }else{
            console.log("Attending")
            db.collection("eventPeople").add({
                eventID: currentComponent.state.eventData.id,
                userID: currentComponent.props.user.uid, 
                userImg: currentComponent.props.user.photoURL,
                userName: currentComponent.props.user.displayName,
            })
            .then(function(doc) {
                console.log("Document written with ID: ", doc.id);

                let youEventsRefData = [];
                
                let newProg = { 
                    "eventID": currentComponent.state.eventData.id,
                    "userID": currentComponent.props.user.uid, 
                    "userImg": currentComponent.props.user.photoURL,
                    "userName": currentComponent.props.user.displayName,
                    "uid": doc.id,
                };
                youEventsRefData.push(newProg)
                currentComponent.setState({ yourLikeData: youEventsRefData[0] });    
                currentComponent.setState({ eventPeopleData: currentComponent.state.eventPeopleData + 1 });    

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        this.setState(state => ({ willAttend: !state.willAttend }));

    };

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
                        
                        <h3 className="eventAttendees">
                            {this.state.eventPeopleData == 1 ?
                               this.state.eventPeopleData + " person is attending"
                            :
                               this.state.eventPeopleData + " people are attending"
                            }

                            
                        </h3>
                        <h3 className="attendQuestion">Will you be attending as well?</h3>
                        <button className="attendingButton" onClick={this.handleSubmitEventAction}>
                            {this.state.willAttend ?
                              "Check Out"
                            : 
                              "Check In"
                            }
                        
                        </button>
   
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