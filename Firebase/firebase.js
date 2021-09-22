import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA14IcG74HQ12OM0PnWf2LD1pOe950b3Vc",
  authDomain: "next-usequery.firebaseapp.com",
  databaseURL: "https://next-usequery-default-rtdb.firebaseio.com",
  projectId: "next-usequery",
  storageBucket: "next-usequery.appspot.com",
  messagingSenderId: "388238411617",
  appId: "1:388238411617:web:4f3e786678d42c19c06720"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // const db = firebase.firestore()
  }

  const db = firebase.firestore()


export { db }
