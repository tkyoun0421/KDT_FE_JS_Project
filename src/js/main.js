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
                let template = `<div class="profile-info">
                <input
                class="checkbox"
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
        loadingEl.style.display = 'none';
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});
