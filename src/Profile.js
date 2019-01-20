import React, { Component } from 'react';
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';  
import { Link } from "react-router-dom";

class Profile extends Component {
    constructor(){
      super();
      this.state = {
        locationData: [],
        eventData: [],
        userData: null,
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
        const compRef = db.collection("eventPeople").where("userName", "==", this.props.match.params.name);
    
        console.log(this.props.match.params.name)

        const userRef = db.collection("users").where("name", "==", this.props.match.params.name);
    
        var userccData = []
        //Query Data
        userRef.get().then(function(querySnapshot) {


          querySnapshot.forEach(function(doc) {

              let newUser = { 
                "name": doc.data().name,
                "photo": doc.data().photo, 
                "userID": doc.data().userID
              };
              userccData = newUser
              console.log(newUser)
              
          });
          currentComponent.setState({ userData: userccData });    

        }); 


        var ccData = []

        //Query Data
        compRef.get().then(function(querySnapshot) {


          querySnapshot.forEach(function(doc) {

              let newLocation = { 
                "eventID": doc.data().eventID,
                "userID": doc.data().userID, 
                "userImg": doc.data().userImg,
                "userName": doc.data().userName,
              };

              const eventsRef = db.collection("events").doc(doc.data().eventID);        
              let eventsRefData = [];
              //Query Data

              eventsRef.get().then(function (doc) {
                if (doc.exists) {

                  let newProg = { 
                    "attending": doc.data().attending,
                    "description": doc.data().description, 
                    "location": doc.data().image,
                    "name": doc.data().name,
                    "image": doc.data().image,
                    "uid": doc.id,
                  };
                  ccData.push(newProg)

                  console.log(ccData)
                  currentComponent.setState({ eventData: ccData });    

                }else{
                  console.log("failed feenkfl")
                }

              });

              
          });

 

        });    

    }

    render() {

      return (


        <div className="mainContent">

        <div className="eventBGI">
            <p>
              
            {this.state.userData ?

                <p><img src={this.state.userData.photo}/></p>

            :
                ""
            }
            </p>
                            
            <div className="overlayEvent"></div>
        </div>

        <h1 className="eventTitle">
            {this.state.userData ?

              this.state.userData.name
            :
              ""
            }
          
          </h1>



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



export default Profile;