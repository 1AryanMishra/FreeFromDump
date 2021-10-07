import { GoogleAuthProvider, signOut, getAuth, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js'

const auth = getAuth();

const user = auth.currentUser;


if(user){
    document.querySelector('.sign_out').style.display = 'block';
    document.querySelector('.sign_in').style.visibility = 'hidden';
    document.querySelector('.sign_in_box').style.display = 'none';
    document.querySelector('.greet_user').style.display = 'flex';
    document.querySelector('.greet_user').querySelector('.user_dp').src = `${user.photoURL}`;
    document.querySelector('.greet_user').querySelector('.username').textContent = `Hello, ${getFirstName(user.displayName)}`;
}
else{
    const signInBtns = document.querySelectorAll('.sign_in');
    const Google = new GoogleAuthProvider();
    
    signInBtns.forEach((b) => {
        b.addEventListener('click', () => {
            document.querySelector('.sign_in_box').classList.toggle('visible');
        })
    })

    const prov_btn = document.querySelectorAll('.login_provider');

    prov_btn.forEach((f) => {
        f.addEventListener('click', () => {
            signInWithPopup(auth, Google).then((result) => {
                document.querySelector('.sign_out').style.display = 'block';
                document.querySelector('.sign_in').style.visibility = 'hidden';
                document.querySelector('.sign_in_box').style.display = 'none';
                document.querySelector('.greet_user').style.display = 'flex';
                document.querySelector('.greet_user').querySelector('.user_dp').src = `${result.user.photoURL}`;
                document.querySelector('.greet_user').querySelector('.username').textContent = `Hello, ${getFirstName(result.user.displayName)}`;
            }).catch((err) => {
                console.log(err);
                document.querySelector('.retry_msg').style.display = 'block';
            })
        })
    })

    function getFirstName(name){
        var fname = '';
        for (let i = 0; i < name.length; i++) {
            if(name[i] == " "){
                break;
            }
            else{
                fname += name[i];
            }
        }
        return fname;
    }

    document.querySelector('.sign_out').addEventListener('click', () => {
        signOut(auth).then(() => {
            document.querySelector('.sign_out').style.display = 'none';
            document.querySelector('.sign_in').style.visibility = 'visible';
            document.querySelector('.greet_user').style.display = 'none';
            document.querySelector('.retry_msg').style.display = 'none';
        })
        .catch((err) => {
            document.querySelector('.sign_out_err').classList.toggle('sign_out_err_visible');
        })
    })
}
