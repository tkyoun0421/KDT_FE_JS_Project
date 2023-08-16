import { initializeApp } from 'firebase/app';

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
const storage = firebase.storage();

db.collection('profile')
    .get()
    .then((res) => {
        res.forEach((doc) => {
            const profileListBtmEl =
                document.querySelector('.profile-list-btm');
            const div = document.createElement('div');
            const profileItemEls = [
                ...document.querySelectorAll('.profile-item'),
            ];
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

            div.classList.add('profile-item');
            div.innerHTML = template;
            profileListBtmEl.append(div);
            div.style.backgroundImage = `url(${doc.data().photo})`;
        });
    });

const btnSubmitEl = document.querySelector('.btn-submit');

btnSubmitEl.addEventListener('click', () => {
    const inputFileEl = document.querySelector('.input-file');
    const file = inputFileEl.files[0];
    const storageRef = storage.ref();
    const savePath = storageRef.child('image/' + file.name);
    const upload = savePath.put(file);

    const rankEl = document.querySelector('.input-rank');
    const nameEl = document.querySelector('.input-name');

    upload.on(
        'state_changed',
        null,
        (error) => {
            console.error('실패 사유는', error);
        },
        () => {
            upload.snapshot.ref.getDownloadURL().then((url) => {
                let item = {
                    rank: rankEl.value,
                    name: nameEl.value,
                    photo: url,
                };
                db.collection('profile')
                    .add(item)
                    .then(() => {
                        window.location.href = './index.html';
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    );
});
