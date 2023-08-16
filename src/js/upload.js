const inputFileEl = document.querySelector('.input-file');
inputFileEl.addEventListener('change', (e) => {
    const imgEl = document.querySelector('.image');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            imgEl.setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});
