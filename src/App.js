import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Events from './Events';
import Locations from './Locations';
import Home from './Home';
import Profile from './Profile';
import Header from './Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import firebase, { auth, provider } from './Firestore.js';
import '../src/Firestore.js';  

import './website.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 


    this.state = {
       user: null 
    }

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        console.log(user);
      }

    });
  }

  logout = event => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });

  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;

        console.log(user.uid)
        const db = firebase.firestore();
        const userRef = db.collection("users").where("userID", "==", user.uid);
        userRef.get().then(function(snapshot) {
            if (snapshot.exists){
              console.log("Does exists")
            }else{
              console.log("Does Not exists")

              db.collection("users").add({
                name: user.displayName,
                photo: user.photoURL,
                email: user.email,
                userID: user.uid,
                location: new firebase.firestore.GeoPoint(42.2746, -71.8063),
              })
              .then(function(docRef) {
                  console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

            }
        });

        this.setState({
          user
        });
      });
  }



  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header login = {this.login} logout = {this.logout} user = {this.state.user} />

            <Route exact path="/" 
              render={(props) => <Home  {...props} />}
            />
            <Route path="/events/:id"
              render={ (props) => <Events  {...props} />}
            />
            <Route path="/location/:name" 
              render={ (props) => <Locations  {...props} />}
            />
            <Route path="/profile/:name" 
              render={ (props) => <Profile   {...props} />}
            />

          </div>
      </Router>
      </div>
    );
  }
}


if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}


export default App;
