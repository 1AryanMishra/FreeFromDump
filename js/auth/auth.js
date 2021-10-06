const signInBtns = document.querySelectorAll('.sign_in');

signInBtns.forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelector('.sign_in_box').classList.toggle('visible');
    })
})

const prov_btn = document.querySelectorAll('.login_provider');

prov_btn.forEach((f) => {
    f.addEventListener('click', () => {
    })
})