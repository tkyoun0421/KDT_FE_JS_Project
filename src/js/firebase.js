const firebaseConfig = {
    apiKey: 'AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo',
    authDomain: 'project-1-8debf.firebaseapp.com',
    projectId: 'project-1-8debf',
    storageBucket: 'project-1-8debf.appspot.com',
    messagingSenderId: '386056815137',
    appId: '1:386056815137:web:92425cb061808073ed9960',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

// function loadData() {
//     db.collection('profile')
//         .get()
//         .then((res) => {
//             res.forEach((doc) => {
//                 const profileListBtmEl =
//                     document.querySelector('.profile-list-btm');
//                 const div = document.createElement('div');
//                 let template = `<div class="profile-info">
//                 <input
//                 class="checkbox"
//                 type="checkbox"
//                 id="profile-item"
//                 name="profile-item"
//                 />
//                 <span class="name">${doc.data().name}</span>
//                 <span class="rank">${doc.data().rank}</span>
//                 </div>
//                 `;

//                 div.classList.add('profile-item');
//                 div.innerHTML = template;
//                 profileListBtmEl.append(div);
//                 div.style.backgroundImage = `url(${doc.data().photo})`;
//             });
//         });
// }

// loadData();
