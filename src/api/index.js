import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDMyCZTEKZhB_jJ3NrLSqgakkZDxzEMZ7Q",
    authDomain: "shopping-app-d2c72.firebaseapp.com",
    databaseURL: "https://shopping-app-d2c72.firebaseio.com",
    storageBucket: "shopping-app-d2c72.appspot.com",
    messagingSenderId: "85098982640"
  };

firebase.initializeApp(config);

var database = firebase.database();

export default database;  