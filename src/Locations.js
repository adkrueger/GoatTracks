import React, { Component } from 'react';
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';  
import { Link } from "react-router-dom";

class Locations extends Component {
    constructor(){
      super();
      this.state = {
        locationData: [],
        eventData: [],
      }
    }

    componentDidMount(){
      let currentComponent = this;
        //Load Firebase Stuff
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: false};
        firestore.settings(settings);
    
        //Load Location or Path for Query
        const db = firebase.firestore();
        const compRef = db.collection("locations").where("name", "==", this.props.match.params.name);
    
        var ccData = []
        //Query Data
        compRef.get().then(function(querySnapshot) {


          querySnapshot.forEach(function(doc) {

              let newLocation = { 
                "id": doc.id,
                "name": doc.data().name, 
                "lat": doc.data().coords.latitude,
                "lon": doc.data().coords.longitude,
                "image": doc.data().image
              };
              ccData = newLocation
              console.log(newLocation)
              
          });
          currentComponent.setState({ locationData: ccData });    

          const eventsRef = db.collection("events").where("location", "==", ccData.name);

          let eventsRefData = [];
          //Query Data
          eventsRef.get().then(function(querySnapshot) {
  
              querySnapshot.forEach(function(doc) {
        
        
                  let newProg = { 
                    "attending": doc.data().attending,
                    "description": doc.data().description, 
                    "location": doc.data().image,
                    "name": doc.data().name,
                    "image": doc.data().image,
                    "uid": doc.id,
                  };
                  eventsRefData.push(newProg)
              });
              currentComponent.setState({ eventData: eventsRefData });    
        
            }); 

        });    

        console.log(this.state.locationData)


      


    }

    render() {
      return (
      <div className="mainContent">
          <div className="row">
            <div className="col-sm-12">

                 <div className="eventBGI">
                      <p><img src={this.state.locationData.image}/></p>
                      <div className="overlayEvent"></div>
                  </div>

                  <h1 className="eventTitle">{this.state.locationData.name}</h1>

            
              <br></br>

              <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <br></br>
              <h5>Events</h5>
              <p></p>

              {this.state.eventData.map(function(event, idx){
                return (

                   
                
                <div class="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <Link to={'/events/'+event.uid}>

                                    <img className="card-img-top" src={event.image} alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.name}</h5>
                                        <p className="card-text">View Event</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
    
                    );
                })}  


            </div>
            <div className="col-sm-1"></div>
          </div>
            
 
                          
            </div>
          </div> 
            
      </div>
      );
    }
}



export default Locations;