import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtBSfN6jIhMCBZFbMEKw6jwyjcTQASv94",
    authDomain: "shopping-bb01e.firebaseapp.com",
    databaseURL: "https://shopping-bb01e.firebaseio.com",
    projectId: "shopping-bb01e",
    storageBucket: "shopping-bb01e.appspot.com",
    messagingSenderId: "876623002744"
};
const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true }) //firebase 업데이트에 따른 추가해줘야함. 

//export firestore database
export default firebaseApp.firestore()