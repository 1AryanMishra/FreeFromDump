import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, getDocs, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user){
        const data = {
            name : `${user.displayName}`,
            email : `${user.email}`,
            uid : `${user.uid}`
        }
        console.log("User Exists.", data);
        console.log("Fetching User Data from Database...");

        console.log("Setting User Data...");
        const setting = setDoc(doc(db, "users", `${user.uid}`), data);
        setting.then(() => {
            const UserData = getDocs(query(collection(db, "users"), where("uid", "==", `${user.uid}`)));
            UserData.then((response) => {
                console.log("Inside UserData.then ");
                response.forEach((f) => {
                    console.log(f.id, "=>", f.data());
                })
            })
        }).catch((err) => {
            console.log("Error while setting User Data : ",err);
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})