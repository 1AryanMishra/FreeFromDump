import { GoogleAuthProvider, getAuth, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js'

const signInBtns = document.querySelectorAll('.sign_in');
const Google = new GoogleAuthProvider();
const auth = getAuth();

signInBtns.forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelector('.sign_in_box').classList.toggle('visible');
    })
})

const prov_btn = document.querySelectorAll('.login_provider');

prov_btn.forEach((f) => {
    f.addEventListener('click', () => {
        signInWithPopup(auth, `${f.id}`).then((result) => {
            console.log(result.user);
        }).catch((err) => {
            console.log(err);
            document.querySelector('.retry_msg').classList.toggle('display_err');
        })
    })
})