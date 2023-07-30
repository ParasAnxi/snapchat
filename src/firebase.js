import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCzmhSrS-5qcyI3EDMxljqlpSHRjmK79MU",
  authDomain: "snapchat-e6daa.firebaseapp.com",
  projectId: "snapchat-e6daa",
  storageBucket: "snapchat-e6daa.appspot.com",
  messagingSenderId: "289007043925",
  appId: "1:289007043925:web:105264d156d0a9488adbdc",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, db ,provider, storage };
