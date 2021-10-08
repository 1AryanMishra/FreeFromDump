import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, getDocs, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        const oldUser = getDocs(query(collection(db, 'users'), where("uid", "==", `${user.uid}`)));
        oldUser.then((response) => {
            if(response){
                response.forEach((d) => {
                    console.log("User Exists.");
                    const userData = {
                        name : `${d.data().name}`,
                        email : `${d.data().email}`,
                        uid : `${d.data().uid}`
                    }
                    console.log(userData);
                })
            }
            else{
                console.log("User does NOT exists.");
                console.log("Setting User Data...");
                const setting = setDoc(doc(db, 'users', `${user.uid}`), {
                    name : `${user.displayName}`,
                    uid : `${user.uid}`,
                    email : `${user.email}`,
                    course : `${JSON.parse(sessionStorage.getItem("course"))}`,
                    level : `${JSON.parse(sessionStorage.getItem("level"))}`
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})