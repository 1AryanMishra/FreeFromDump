import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, getDocs, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        const oldUser = getDocs(query(collection(db, 'users'), where("uid", "==", `${user.uid}`)));
        oldUser.then((response) => {
            response.forEach((d) => {
                console.log("User Exists.");
                const userData = {
                    name : `${d.data().name}`,
                    email : `${d.data().email}`,
                    uid : `${d.data().uid}`
                }
                console.log(userData);
            })
        }).catch((err) => {
            console.log("User does NOT exists.");
            console.log(err);
            console.log("Setting User Data...");
            const setting = setDoc(doc(db, 'users', `${user.uid}`), {
                name : `${user.displayName}`,
                uid : `${user.uid}`,
                email : `${user.email}`,
                course : `${JSON.parse(sessionStorage.getItem("course"))}`,
                level : `${JSON.parse(sessionStorage.getItem("level"))}`
            })
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})