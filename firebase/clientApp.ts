import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/storage";

const clientCredentials = {
    apiKey: "AIzaSyAdUIezMWR27NclaeE8LRczeUp4jZGPoHQ",
    authDomain: "cuminnextjs.firebaseapp.com",
    projectId: "cuminnextjs",
    storageBucket: "cuminnextjs.appspot.com",
    messagingSenderId: "774545627494",
    appId: "1:774545627494:web:7b52ec8fcd647fb71250a7"
}

if(!firebase.apps.length){
    firebase.initializeApp(clientCredentials);
}

const firestore: any = firebase.firestore();

export default firestore