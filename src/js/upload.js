import { db, storage } from './firebase';

let docId = '';
const docRef = db.collection('profile');
const btnSubmitEl = document.querySelector('.btn-submit');
const formEl = document.querySelector('form');
const btnCancelEl = document.querySelector('.btn-cancel');
const inputFileEl = document.querySelector('.input-file');
const inputRankEl = document.querySelector('.input-rank');
const inputNameEl = document.querySelector('.input-name');
const btnModifyEl = document.querySelector('.btn-modify');
const btnDeleteEl = document.querySelector('.btn-delete');
const [hash, queryString] = location.search.split('=');

btnSubmitEl.addEventListener('click', uploadData);
inputFileEl.addEventListener('change', showPreviewImg);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        uploadData();
    }
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
});

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
    }
    if (queryString && inputFileEl.value) {
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

btnCancelEl.addEventListener('click', () => {
    window.location.href = './index.html';
});

// const fileRef = storageRef.child(filePath);
console.log(fileRef);
