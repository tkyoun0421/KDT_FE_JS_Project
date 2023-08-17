import { db, storage } from './firebase';

const btnSubmitEl = document.querySelector('.btn-submit');
btnSubmitEl.addEventListener('click', uploadData);

function uploadData() {
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
                    id: new Date().getTime(),
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
}

const inputFileEl = document.querySelector('.input-file');
inputFileEl.addEventListener('change', showPreviewImg);

function showPreviewImg(e) {
    const imgEl = document.querySelector('.image');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            imgEl.setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
    }
}
