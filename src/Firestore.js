import firebase from "firebase";

var config = {
    apiKey: "AIzaSyA22OABD94DyzGrXAh23uQ3kbLG1wmmw0c",
    authDomain: "goattracks-166ca.firebaseapp.com",
    databaseURL: "https://goattracks-166ca.firebaseio.com",
    projectId: "goattracks-166ca",
    storageBucket: "goattracks-166ca.appspot.com",
    messagingSenderId: "641193941813"
  };
firebase.initializeApp(config);


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;