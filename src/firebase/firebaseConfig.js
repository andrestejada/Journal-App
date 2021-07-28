import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey:process.env.REACT_APP_APIKEY ,
    authDomain:process.env.REACT_APP_AUTHDOMAIN ,
    projectId:process.env.REACT_APP_PROJECTID ,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
    appId:process.env.REACT_APP_APPID 
  };

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCXAZaZ5983sZf9lOVS-ePXDNVZZGNWGBU",
//     authDomain: "journal-app-testing-72d1b.firebaseapp.com",
//     projectId: "journal-app-testing-72d1b",
//     storageBucket: "journal-app-testing-72d1b.appspot.com",
//     messagingSenderId: "291700895874",
//     appId: "1:291700895874:web:242fe5d2af8f20b6ea049b"
//   };

// if( process.env.NODE_ENV==='test'){
//   //Testing
//   firebase.initializeApp(firebaseConfigTesting);
// }else{
//   //dev/production
//   firebase.initializeApp(firebaseConfig);
// }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { db , googleAuthProvider ,firebase}


