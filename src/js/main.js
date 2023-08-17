import { db } from './firebase';
const itemWrapEl = document.querySelector('.item-wrap');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const docRef = db.collection('profile');
        const loadingEl = document.querySelector('.loading');
        await docRef.get().then((res) => {
            res.forEach((doc) => {
                const div = document.createElement('div');
                const a = document.createElement('a');
                let template = `<div class="profile-info">
                <span class="name">${doc.data().name}</span>
                <span class="rank">${doc.data().rank}</span>
                </div>
                `;

                div.classList.add('profile-item');
                div.append(a);
                div.style.backgroundImage = `url(${doc.data().photo})`;
                itemWrapEl.append(div);

                a.innerHTML = template;
                a.setAttribute('href', `./upload.html?id=${doc.data().id}`);
            });
        });
        loadingEl.classList.add('hide');
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

const searchInputEl = document.querySelector('.search-input');
const loadingEl = document.querySelector('.loading');

searchInputEl.addEventListener('change', async () => {
    try {
        let searchValue = searchInputEl.value;
        const docRef = db.collection('profile');
        const nameQuery = docRef.where('name', '==', `${searchValue}`);
        const rankQuery = docRef.where('rank', '==', `${searchValue}`);
        loadingEl.classList.remove('hide');
        itemWrapEl.innerHTML = '';
        if (!searchValue) {
            await docRef.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                });
            });
        } else {
            await nameQuery.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                });
            });
            await rankQuery.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                });
            });
        }
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

function makeProfileItem(doc) {
    const div = document.createElement('div');
    const a = document.createElement('a');
    let template = `<div class="profile-info">
                        <span class="name">${doc.data().name}</span>
                        <span class="rank">${doc.data().rank}</span>
                        </div>
                        `;

    div.classList.add('profile-item');
    div.append(a);
    div.style.backgroundImage = `url(${doc.data().photo})`;
    itemWrapEl.append(div);

    a.innerHTML = template;
    a.setAttribute('href', `./upload.html?id=${doc.data().id}`);
    loadingEl.classList.add('hide');
}
