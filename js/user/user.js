import db from '../../database/firestore.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, where, getDoc, getDocs, setDoc, query } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const auth = getAuth();

if((sessionStorage.getItem('isLoggedIn') === null)){
    sessionStorage.setItem('isLoggedIn', 1);
}



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



const courses = document.querySelectorAll('.targetCard');



function FetchUserLevelData(user){
    const targetSection = document.querySelector('.targets');
    const UserCourses = getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`));
    UserCourses.then((c) => {
        c.forEach((d) => {
            targetSection.innerHTML += `<div class="targetCard" id="${d.data().course}">${d.data().course}</div>`
        })
        for(var i = 0; i<courses.length; i++){
            courses[i].addEventListener('click', () => {
                RenderTargetMaterial(courses[i].id, i);
            })
        }
    })
}







function renderPrereq(prereq){
    var prereqList = "";
    for(var i = 0; i<prereq.length; i++){
        prereqList += `<li>${prereq[i]}</li>`;
    }
    return(`
    <ul class="prerequisites">
        ${prereqList}
    </ul>
    `)
}


function RenderPracticeArea(data){
    var practiceSets = "";
    for(var i=0; i<data.length; i++){
        practiceSets += `<img class="practiceSites" src="${data[i]}">`;
    }
    return practiceSets;
}




function RenderExcersises(course, user){
    const PracticeArea = document.querySelector('.practiceArea');
    const PracticeData = getDoc(query(doc(db, 'fields', `${user.course}`, `${user.level}`), where("course", "==", `${course}`)));
    PracticeData.then((data) => {
        if(data.data()._snapshot.docChanges.length >= 1){
            PracticeArea.innerHTML = RenderPracticeArea(data.data());
        }
        else{
            PracticeArea.textContent = "No Practice Data Available.";
        }
    })
}



function RenderResource(data){
    return (
        `
            <div class="target_res">
                <div class="channel_intro">
                    <div class="channel_logo">${data.logo}</div>
                    <h3 class="channel_name">${data.title}</h3>
                </div>
                <div class="res_flex_area">
                    <iframe class = "demo_player" src="https://www.youtube.com/embed/${data.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="res_desc">
                        <p class="desc_text">${data.description}</p>
                        <p class="desc_text">Prerequisites : </p>
                        ${renderPrereq(data.prerequisites)}
                    </div>
                </div>
                <button class="watchOnYT">Watch On YouTube</button>
            </div>
    `)
}


function GetSetResData(course, i, user){
    const res_container = document.querySelector('.target_res_container');
    const courseData = getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`, `${i}`, 'resources'));
    var course_data = '';
    courseData.then((response) => {
        response.forEach((d) => {
            course_data += `${RenderResource(d.data())}`;
        })
        res_container.innerHTML = course_data;
    })
}

function RenderResources(course, i, user){
    const res_area = document.querySelector('.resources_area');
    res_area.querySelector('.target_name').textContent = `${course}`;
    GetSetResData(course, i, user);
}


function RenderTargetMaterial(course, i, user){
    RenderResources(course, i, user);
    RenderExcersises(course, user);
}





onAuthStateChanged(auth, (user) => {
    if(user){

        //======= User Greeting =======
        const greet_user = document.querySelector('.greet_user');

        document.querySelector('.sign_out').style.display = 'block';
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

                window.open('https://mayajal.netlify.app/pages/first_page.html', '_top');
            })
            .catch((err) => {
                document.querySelector('.sign_out_err').classList.toggle('sign_out_err_visible');
            })
        })

        //======= User Data Fetching/Setting Processing =======
        const oldUser = getDocs(query(collection(db, 'users'), where("uid", "==", `${user.uid}`)));
        oldUser.then((response) => {
            if(response._snapshot.docChanges.length >= 1){
                response.forEach((u) => {
                    FetchUserLevelData(u.data());
                })
            }
            else{
                const UserDataToSet = {
                    name : `${user.displayName}`,
                    uid : `${user.uid}`,
                    email : `${user.email}`,
                    course : `${sessionStorage.getItem("course")}`,
                    level : `${sessionStorage.getItem("level")}`
                }
                const setting = setDoc(doc(db, 'users', `${user.uid}`), UserDataToSet);
                setting.then(() => {
                    FetchUserLevelData(UserDataToSet);
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
