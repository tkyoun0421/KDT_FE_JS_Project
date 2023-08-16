// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo',
    authDomain: 'project-1-8debf.firebaseapp.com',
    projectId: 'project-1-8debf',
    storageBucket: 'project-1-8debf.appspot.com',
    messagingSenderId: '386056815137',
    appId: '1:386056815137:web:92425cb061808073ed9960',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection('profile')
    .get()
    .then((res) => {
        res.forEach((doc) => {
            const profileItemEl = document.querySelector('.profile-list-btm');
            const div = document.createElement('div');
            div.classList.add('profile-item');

            let template = `<div class="profile-info">
                    <input
                        type="checkbox"
                        id="profile-item"
                        name="profile-item"
                    />
                    <span class="name">${doc.data().name}</span>
                    <span class="rank">${doc.data().rank}</span>
                </div>
            `;
            div.innerHTML = template;
            profileItemEl.append(div);
        });
    });
