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

const database=firebase.database();

database.ref().set({
    name:'remy ponso',
    age:36,
    stressLevel:6,
    job:{
        title:'software dev',
        company:'Google'
    },
    isSingle:true,
    location:{
        city:'sampa',
        state:'sp'
    }
});

database.ref().update({
    stressLevel:9,
    "job/company":'Amazon',
    "location/city":'Seattle'
});