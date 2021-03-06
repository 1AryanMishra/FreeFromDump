import db from '../../database/firestore.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { doc, collection, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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






async function FetchUserLevelData(user){
    const targetSection = document.querySelector('.targets');
    const UserCourses = await getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`)).then((c) => {
        var courseDataToBeRendered = "";
        c.forEach((d) => {
            courseDataToBeRendered += `<div class="targetCard" id="${d.id}">${d.data().course}</div>`
        })
        targetSection.innerHTML = courseDataToBeRendered;

        const courses = document.querySelectorAll('.targetCard');

        courses.forEach((c) => {
            c.addEventListener('click', () => {
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
    const PracticeArea = document.querySelector('.practiceArea');
    const PracticeData = getDoc(doc(db, 'fields', `${user.course}`, `${user.level}`, `${i}`));
    PracticeData.then((data) => {
        if(data.data().practiceSets){
            PracticeArea.innerHTML = RenderPracticeArea(data.data().practiceSets);
        }
        else{
            PracticeArea.innerHTML = "";
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


async function GetSetResData(i, user){
    const res_container = document.querySelector('.target_res_container');
    var course_data = '';
    const courseData = await getDocs(collection(db, 'fields', `${user.course}`, `${user.level}`, `${i}`, 'resources')).then((response) => {
        response.forEach((d) => {
            course_data += `${RenderResource(d.data())}`;
        })
        res_container.innerHTML = course_data;
    })
}

function RenderResources(i, user, courseName){
    const res_area = document.querySelector('.resources_area');
    res_area.querySelector('.target_name').textContent = `${courseName}`;
    GetSetResData(i, user);
}


function RenderTargetMaterial(i, user, courseName){
    RenderResources(i, user, courseName);
    RenderExcersises(i, user);
}





onAuthStateChanged(auth, async (user) => {
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

                window.open('https://mayajal.netlify.app', '_top');
            })
            .catch((err) => {
                document.querySelector('.sign_out_err').classList.toggle('sign_out_err_visible');
            })
        })

        await getDoc(doc(db, 'users', `${user.uid}`)).then((response) => {
            FetchUserLevelData(response.data());
        });
    }
    else{
        window.open('https://mayajal.netlify.app', '_top');
    }
})
