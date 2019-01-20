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

<div className="eventBGI">
    <p><img src={this.state.locationData.image}/></p>
    <div className="overlayEvent"></div>
</div>

<h1 className="eventTitle">{this.state.locationData.name}</h1>



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
      <h6>Events</h6>
    <br></br>

    <div className="row">


        {this.state.eventData.map(function(d, idx){
          return (
            <div className="col-sm-4" key={idx}>

              <div className="cardMod"> 
                  <Link to={{ pathname: '/events/' + d.uid}} className="progLink">
                    <img className="cardModImg" src={d.image} alt="Card image cap"></img>
                    <div className="cardMod-overlay"></div>
                    <h5 className="cardMod-title">{d.name}</h5>
                  </Link>
                  <Link to={"/composer/" + d.composerName} className="progLink">
                    <p className="cardMod-text">View Event</p>
                  </Link>
              </div>

              <br></br>

            </div> 
          );

        })}

      
    </div>

           
  </div>
  <div className="col-sm-1"></div>
</div>
  
</div>



      );
    }
}



export default Locations;