import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDwUV4-YXbC677uKpN-N-uCi4a8oH1YLIQ",
    authDomain: "expensify-app-276f7.firebaseapp.com",
    databaseURL: "https://expensify-app-276f7.firebaseio.com",
    projectId: "expensify-app-276f7",
    storageBucket: "expensify-app-276f7.appspot.com",
    messagingSenderId: "984499892783"
};

firebase.initializeApp(config);

firebase.database().ref().set({
    name:'remy ponso'
});