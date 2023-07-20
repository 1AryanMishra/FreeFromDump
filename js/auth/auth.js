import { GoogleAuthProvider, signOut, getAuth, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js'

const auth = getAuth();
const signInBtns = document.querySelectorAll('.sign_in');
    
signInBtns.forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelector('.sign_in_box').classList.toggle('visible');
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


function signIn(){
    const Google = new GoogleAuthProvider();

    const signInBtns = document.querySelectorAll('.sign_in');
    signInBtns.forEach((b) => {
        b.style.visibility = "visible";
    })

    const prov_btn = document.querySelectorAll('.login_provider');

    prov_btn.forEach((f) => {
        f.addEventListener('click', () => {
            signInWithPopup(auth, Google).then((result) => {
                document.querySelector('.sign_out').style.display = 'block';
                document.querySelector('.sign_in').style.visibility = 'visible';
                document.querySelector('.sign_in_box').classList.toggle('visible');
                document.querySelector('.greet_user').style.display = 'flex';
                document.querySelector('.greet_user').querySelector('.user_dp').src = `${result.user.photoURL}`;
                document.querySelector('.greet_user').querySelector('.username').textContent = `Hello, ${getFirstName(result.user.displayName)}`;
            }).catch((err) => {
                console.log(err);
                document.querySelector('.retry_msg').style.display = 'block';
            })
        })
    })
}


onAuthStateChanged(auth, async (user) => {
    if(user){
        //Adding Greet
        document.querySelector('.sign_out').style.display = 'block';
        document.querySelector('.sign_in').style.visibility = 'visible';
        document.querySelector('.sign_in_box').style.display = 'none';
        const greetUser = document.querySelector('.greet_user');
        greetUser.style.display = 'flex';
        greetUser.querySelector('.user_dp').src = `${user.photoURL}`;
        greetUser.querySelector('.username').textContent = `Hello, ${getFirstName(user.displayName)}`;
        greetUser.querySelector('.user_dp').addEventListener('click', () => {
            window.open('https://mayajal.netlify.app/pages/user.html', '_top');
        })

        //SignOut btn function
        document.querySelector('.sign_out').addEventListener('click', () => {
            signOut(auth).then(() => {
                document.querySelector('.sign_out').style.display = 'none';
                document.querySelector('.sign_in_box').style.display = 'flex'
                document.querySelector('.greet_user').style.display = 'none';
                document.querySelector('.retry_msg').style.display = 'none';

                signIn();
            })
            .catch((err) => {
                document.querySelector('.sign_out_err').classList.toggle('sign_out_err_visible');
            })
        })

    }
    else{
        signIn();
    }    
})
