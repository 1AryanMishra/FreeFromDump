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






function FetchUserLevelData(user){
    console.log("Fetching ", user.name, "courses.");
    const targetSection = document.querySelector('.targets');
    console.log("User Course is ", user.course, "User Level is ", user.level);
    const UserCourses = getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`));
    UserCourses.then((c) => {
        console.log(c);
        var courseDataToBeRendered = "";
        console.log("Fetched courses");
        c.forEach((d) => {
            console.log(d);
            console.log("Course is ", d.data().course);
            courseDataToBeRendered += `<div class="targetCard" id="${d.id}">${d.data().course}</div>`
        })
        console.log("Rendering Courses Cards.");
        targetSection.innerHTML = courseDataToBeRendered;

        const courses = document.querySelectorAll('.targetCard');
        console.log("There are ", courses.length, "courses.");

        courses.forEach((c) => {
            c.addEventListener('click', () => {
                console.log("Addind Event Listener for Course ", c.id);
                RenderTargetMaterial(c.id, user, c.textContent);
            })
        })
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




function RenderExcersises(i, user){
    console.log("Rendering Excersises for ", i);
    const PracticeArea = document.querySelector('.practiceArea');
    const PracticeData = getDoc(doc(db, 'fields', `${user.course}`, `${user.level}`, `${i}`));
    PracticeData.then((data) => {
        if(data.data()._snapshot.docChanges.length >= 1){
            PracticeArea.innerHTML = RenderPracticeArea(data.data().practiceSets);
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
                    <img class="channel_logo" src="${data.logo}">
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
                <a class="watchOnYT" href="https://www.youtube.com/watch?v=${data.videoId}"><button class="watchOnYT">Watch On YouTube</button></a>
            </div>
    `)
}


function GetSetResData(i, user){
    console.log("Fetching Courses for level", user.level);
    const res_container = document.querySelector('.target_res_container');
    const courseData = getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`, `${i}`, 'resources'));
    var course_data = '';
    courseData.then((response) => {
        response.forEach((d) => {
            course_data += `${RenderResource(d.data())}`;
        })
        console.log("Rendering Resources to res_container.");
        res_container.innerHTML = course_data;
    })
}

function RenderResources(i, user, courseName){
    const res_area = document.querySelector('.resources_area');
    res_area.querySelector('.target_name').textContent = `${courseName}`;
    GetSetResData(i, user);
}


function RenderTargetMaterial(i, user, courseName){
    console.log("Rendering TargetMaterial for", i);
    RenderResources(i, user, courseName);
    RenderExcersises(i, user);
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
        console.log("Checking For Old/New User.");
        const oldUser = getDocs(query(collection(db, 'users'), where("uid", "==", `${user.uid}`)));
        oldUser.then((response) => {
            if(response._snapshot.docChanges.length >= 1){
                response.forEach((u) => {
                    console.log("Old User.");
                    FetchUserLevelData(u.data());
                })
            }
            else{
                console.log("New User");
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
