import React, { Component } from 'react';
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';
import { Link } from "react-router-dom";


class Calendar extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      eventsFeedData: []
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
    const compRef = db.collection("events");

    var ccData = []
    //Query Data
    compRef.get().then(function(querySnapshot) {

      querySnapshot.forEach(function(doc) {


          let newProg = { 
            "attending": doc.data().attending,
            "description": doc.data().description, 
            "location": doc.data().image,
            "name": doc.data().name,
            "image": doc.data().image,
            "uid": doc.id,
          };
          ccData.push(newProg)
      });
      currentComponent.setState({ eventsFeedData: ccData });    

    });    

  }
  
    render() {
      return (
      <div className="mainContent">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
            
              <br></br>
              <h2>Events</h2>
              <p></p>
              <hr></hr> 

              {this.state.eventsFeedData.map(function(event, idx){
                return (
                        
                  <Link to={'/events/'+event.uid}>
                    <div> {event.name}</div>
                  </Link>    
                );
             })}  


            </div>
            <div className="col-sm-1"></div>
          </div>
            
      </div>
      );
    }
}

export default Calendar;