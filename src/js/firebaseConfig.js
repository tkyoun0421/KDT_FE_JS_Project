// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJflT56468jr91NjWcHlhWWZ1rtgYr8MQ",
    authDomain: "kdt0-js-photo-board.firebaseapp.com",
    projectId: "kdt0-js-photo-board",
    storageBucket: "kdt0-js-photo-board.appspot.com",
    messagingSenderId: "612459255298",
    appId: "1:612459255298:web:6e7eb29bf7913cae74791b",
    measurementId: "G-P90P4G9TPX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
