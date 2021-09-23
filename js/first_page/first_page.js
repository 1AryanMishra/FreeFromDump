import db from '../../database/firestore.js'
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


const SelectedField = JSON.parse(localStorage.getItem('goal'));

const fieldData = await getDoc(doc(db, "fields", `${SelectedField}`));


function prerequisites(prereq){
    var prereq_list = `<ul class="prerequisites">Prerequisites : `;
    prereq.forEach((p) => {
        prereq_list += `<li>${p}</li>`
    })
    prereq_list += "</ul>";
    return prereq_list;
}


function description(link, logo, title, desc, prereq){
    return (
        `<section class="description">
            <div class="provider">
                <div class="provider_logo"><a href="${link}" target = "_blank"><img src="${logo}" alt="ChannelDp"></a></div>
                <div class="provider_name"><h3>${title}</h3></div>
            </div>
            <p class="some_text">${desc}</p>
            ${prerequisites(prereq)}
            <div class = "course_action">
                <button class = "is_fav" id = "html">!Fav</button>
                <button class = "add_to_list">Watch later</button>
            </div>
        </section>`
    )
}


// To be added in resource_container before description
//<iframe class = "demo_player" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

//<img class = "demo_player" src = "../images/resources/beginner/css/courses/f.jpg" alt = "course demo player">

function resource_container(course_detail){
    return (
        `<li class = "resource_details">
            <iframe class = "demo_player" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            ${description(course_detail.channelLink, course_detail.logo, course_detail.title, course_detail.description, course_detail.prerequisites)}
        </li>`
    )
}



function resources(db){
    var resource_list = `<li class="resources">`;
    resource_list += `<h2 class = "resource_name">${db.course}</h2>
    <section class="resource_container">`;
    for(var i = 0; i<db.resources.length; i++){
        resource_list += resource_container(db.resources[i]);
    }
    resource_list += "</section></li>";
    return resource_list;
}


const beginnerArea = document.querySelector("#beginner_level_rendering");
const intermediateArea = document.querySelector("#intermediate_level_rendering")
const expertArea = document.querySelector("#expert_level_rendering")


const beginnerData = fieldData.data().beginner;
const intermediateData = fieldData.data().intermediate;
const expertData = fieldData.data().expert;

beginnerData.forEach((f) => {
    beginnerArea.innerHTML += `${resources(f)}`;
});

intermediateData.forEach((f) => {
    intermediateArea.innerHTML += `${resources(f)}`;
});

expertData.forEach((f) => {
    expertArea.innerHTML += `${resources(f)}`;
});