import React, { Component } from 'react';
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';  

class Locations extends Component {
    constructor(){
      super();
      this.state = {
        locationData: [],
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
 
                          
            </div>
          </div> 
            
      </div>
      );
    }
}



export default Locations;