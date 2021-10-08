import db from '../../database/firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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
        setDoc(doc(db, 'users', `${user.uid}`), data);
        console.log(data);

        const UserData = getDoc(query(collection(db, 'users'), where("uid", "=", `${user.uid}`)));
        UserData.then((response) => {
            console.log("Inside UserData.then ");
            if(response.data()){
                console.log("User.data() is NOT null");
                console.log("logging UserData response", response.data());
            }
            else{
                console.log("User.data() IS null");
                //console.log("Setting User Data...");
                //setDoc(doc(db, 'users', `${user.uid}`), data);
                console.log(data);
            }
        }).catch((err) => {
            console.log("User Does not Exists.", err);
            //location.reload();
        })
    }
    else{
        window.open('https://freefromdump.netlify.app/pages/first_page.html', '_top');
    }
})