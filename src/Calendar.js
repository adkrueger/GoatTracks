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
                <br></br>
                  <h6>Events</h6>
                <br></br>
  
                <div className="row">
  
  
                    {this.state.eventsFeedData.map(function(d, idx){
                      return (
                        <div className="col-sm-4" key={idx}>
  
                          <div className="cardMod"> 
                              <Link to={{ pathname: '/events/' + d.uid}} className="progLink">
                                <img className="cardModImg" src={d.image} alt="Card image cap"></img>
                                <div className="cardMod-overlay"></div>
                                <h5 className="cardMod-title">{d.name}</h5>
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

export default Calendar;