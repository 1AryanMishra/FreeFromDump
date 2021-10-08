import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        const UserData = getDoc(doc(db, 'users', `${user.uid}`));
        UserData.then((response) => {
            console.log(response.data());
        }).catch((err) => {
            data = {
                name : `${user.displayName}`,
                email : `${user.email}`,
                uid : `${user.uid}`
            }
            setDoc(doc(db, 'users', `${user.uid}`), data);
            console.log(data);
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})