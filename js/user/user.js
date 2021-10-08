import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, getDocs, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();



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



onAuthStateChanged(auth, (user) => {
    if(user){

        //======= User Greeting =======
        const greet_user = document.querySelector('.greet_user');
        greet_user.style.display = 'flex';
        greet_user.querySelector('.user_dp').src = `${user.photoURL}`;
        greet_user.querySelector('.username').textContent = `Hello, ${getFirstName(user.displayName)}`;

        //======= SignOut Functionality =======
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

        //======= User Data Fetching/Setting Processing =======
        const oldUser = getDocs(query(collection(db, 'users'), where("uid", "==", `${user.uid}`)));
        oldUser.then((response) => {
            if(response._snapshot.docChanges.length >= 1){
                
            }
            else{
                const setting = setDoc(doc(db, 'users', `${user.uid}`), {
                    name : `${user.displayName}`,
                    uid : `${user.uid}`,
                    email : `${user.email}`,
                    course : `${sessionStorage.getItem("course")}`,
                    level : `${sessionStorage.getItem("level")}`
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    else{
        window.open('https://mayajal.netlify.app/pages/first_page.html', '_top');
    }
})