import { db, storage } from './firebase';

let docId = '';
const docRef = db.collection('profile');
const btnSubmitEl = document.querySelector('.btn-submit');
btnSubmitEl.addEventListener('click', uploadData);

function uploadData() {
    if (queryString && !inputFileEl.value) {
        const documentRef = docRef.doc(docId);
        const updateField = {
            rank: inputRankEl.value,
            name: inputNameEl.value,
        };
        documentRef
            .update(updateField)
            .then(() => {
                alert('프로필이 변경되었습니다!');
                window.location.href = './index.html';
            })
            .catch((error) => {
                console.error('Error updating document: ', error);
            });
    } else if (inputFileEl.value) {
        console.log('^');
        const file = inputFileEl.files[0];
        const storageRef = storage.ref();
        const savePath = storageRef.child('image/' + file.name);
        const upload = savePath.put(file);
        const documentRef = docRef.doc(docId);
        upload.on(
            'state_changed',
            null,
            (error) => {
                console.error('실패 사유는', error);
            },
            () => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                    const updateField = {
                        rank: inputRankEl.value,
                        name: inputNameEl.value,
                        photo: url,
                    };
                    documentRef
                        .update(updateField)
                        .then(() => {
                            alert('프로필이 변경되었습니다!');
                            window.location.href = './index.html';
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            }
        );
    } else {
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

const inputRankEl = document.querySelector('.input-rank');
const inputNameEl = document.querySelector('.input-name');
const btnModifyEl = document.querySelector('.btn-modify');
const btnDeleteEl = document.querySelector('.btn-delete');
const [hash, queryString] = location.search.split('=');

if (queryString) {
    inputFileEl.setAttribute('disabled', '');
    inputRankEl.setAttribute('disabled', '');
    inputNameEl.setAttribute('disabled', '');
    btnModifyEl.style.display = 'block';
    btnDeleteEl.style.display = 'block';

    docRef
        .get()
        .then((res) => {
            res.forEach((doc) => {
                if (doc.data().id === Number(queryString)) {
                    return (docId = doc.id);
                }
            });
        })
        .catch((error) => {
            console.error('문서 불러오기 중 오류:', error);
        });
} else {
    btnModifyEl.style.display = 'none';
    btnDeleteEl.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', async () => {
    const imgEl = document.querySelector('.image');
    try {
        await docRef.get().then((res) => {
            res.forEach((doc) => {
                if (doc.data().id === Number(queryString)) {
                    imgEl.setAttribute('src', `${doc.data().photo}`);
                    inputFileEl.value = '';
                    inputRankEl.value = doc.data().rank;
                    inputNameEl.value = doc.data().name;
                }
            });
        });
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

btnModifyEl.addEventListener('click', () => {
    inputFileEl.removeAttribute('disabled');
    inputRankEl.removeAttribute('disabled');
    inputNameEl.removeAttribute('disabled');
});

btnDeleteEl.addEventListener('click', () => {
    const documentRef = docRef.doc(docId);
    docRef
        .get()
        .then((res) => {
            res.forEach((doc) => {
                if (doc.data().id === Number(queryString)) {
                    return (docId = doc.id);
                }
            });
        })
        .catch((error) => {
            console.error('문서 불러오기 중 오류:', error);
        });
    documentRef
        .delete()
        .then(() => {
            alert('프로필 삭제가 완료되었습니다');
            window.location.href = './index.html';
        })
        .catch((error) => {
            console.error(error);
        });
});

inputFileEl.addEventListener('change', () => {
    console.log(inputFileEl.value);
});

const fileRef = storage.ref(`image/${doc.data().photo}`);
