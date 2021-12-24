import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB40dw4-bnwc-6lBbCZ_N5oabjQUEx9LB4",
    authDomain: "react-journal-aac06.firebaseapp.com",
    projectId: "react-journal-aac06",
    storageBucket: "react-journal-aac06.appspot.com",
    messagingSenderId: "88139220613",
    appId: "1:88139220613:web:22d0c47104ffa5d7200bec"
  };
  
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }