import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        const UserData = getDoc(doc(db, 'users', `${user.uid}`));
        UserData.then((response) => {
            if(response){
                console.log("logging UserData response", response.data());
            }
            else{
                data = {
                    name : `${user.displayName}`,
                    email : `${user.email}`,
                    uid : `${user.uid}`
                }
                setDoc(doc(db, 'users', `${user.uid}`), data);
                console.log(data);
            }
        }).catch((err) => {
            location.reload();
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})