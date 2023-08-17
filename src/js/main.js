import { db } from './firebase';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const docRef = db.collection('profile');
        const loadingEl = document.querySelector('.loading');
        await docRef.get().then((res) => {
            res.forEach((doc) => {
                const profileListBtmEl =
                    document.querySelector('.profile-list-btm');
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
                profileListBtmEl.append(div);

                a.innerHTML = template;
                a.setAttribute('href', 'profile.html');
            });
        });
        loadingEl.style.display = 'none';
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});
