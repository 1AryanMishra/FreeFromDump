import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCwOB_ZLwC9lXOwVwYAVm9gNRN3WbwoGYE",
authDomain: "freefromdump-777de.firebaseapp.com",
projectId: "freefromdump-777de",
storageBucket: "freefromdump-777de.appspot.com",
messagingSenderId: "127420406329",
appId: "1:127420406329:web:3341e7d741f87468a04be8",
measurementId: "G-W7S4W6BMY4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;