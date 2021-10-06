import db from '../../database/firestore.js'
import { collection, limit, doc, getDoc, orderBy, getDocs, query, startAt } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

sessionStorage.setItem("isActive", "1");

const SelectedField = JSON.parse(localStorage.getItem('goal'));


const goalDoc = doc(db, 'fields', `${SelectedField}`);





function prerequisites(prereqArr){
    var prereq_list = `<ul class="prerequisites">Prerequisites : `;
    for(var i = 0; i<prereqArr.length; i++){
        prereq_list += `<li>${prereqArr[i]}</li>`
    }
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



function remove_whiteSpace(courseName){
    var finalName = "";
    for(var i = 0; i<courseName.length; i++){
        if(courseName[i] === " " || courseName[i] === "&" || courseName[i] === "."){
            continue;
        }
        else{
            finalName += `${courseName[i]}`;
        }
    }
    return finalName;
}



function RenderCourseList(course_name){
    return( 
        `<li class="resources">

            <h2 class = "resource_name">${course_name}</h2>
            <section class="resource_container" id="${remove_whiteSpace(course_name)}">
                <li class = "resource_details more_data_resource_details">
                    <h2 class="fetching_data_text">Loading...</h2>
                    <div class = "demo_player more_data_demo_player"></div>
                    <section class="description more_data_description">
                        <div class="provider more_data_provider">
                            <div class="provider_logo more_data_provider_logo"></div>
                            <div class="provider_name more_data_provider_name"><h3></h3></div>
                        </div>
                        <p class="some_text more_data_some_text"></p>
                        <ul class="prerequisites more_data_prerequisites">
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </li>`
        )
}


async function renderCourse(CourseName, level, LevelCollection, i){
    var res_area_html = `${RenderCourseList(CourseName)}`;
    const CourseData = await getDocs(query(collection(LevelCollection, `${i}`, 'resources'), limit(2)));

    //Rendering Internal Resources List of Course

    CourseData.forEach((d) => {
        const course = d.data();
        res_area_html += `<li class = "resource_details">`;
        //<iframe class = "demo_player" src="https://www.youtube.com/embed/${course.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
        res_area_html += description(course.channelLink, course.logo, course.title, course.description, course.prerequisites);
    
        res_area_html += "</li>";
    })
    res_area_html += "</section></li>";
    level.innerHTML += res_area_html;
    const res_scroll = level.querySelector(`#${remove_whiteSpace(CourseName)}`);
    res_scroll.addEventListener('scroll', () => {
        if(res_scroll.scrollLeft == (res_scroll.scrollWidth - res_scroll.offsetWidth)){
            PaginateCourse(level, CourseName);
        }
    })
}



async function renderLevel(level, i){
    const LevelCollection = collection(goalDoc, `${i}`);
    const CourseQ = query(LevelCollection, limit(2));
    const course_name = await getDocs(CourseQ);
    var it = 0;
    course_name.forEach((f) => {
        renderCourse(f.data().course, level, LevelCollection, it);
        it++;
    })
}














/* ------- Rendering Levels ------- */

const levelClass = document.querySelectorAll(".resources_area");

renderLevel(levelClass[0], 0);
renderLevel(levelClass[1], 1);
renderLevel(levelClass[2], 2);






/* ------- PAGINATION FUNCTION -------  */

async function PaginateLevel(i){
    const docRef = levelClass[i].childElementCount - 1;
    const LevelCollection = collection(goalDoc, `${i}`);
    
    const StartDoc = getDoc(query(doc(LevelCollection, `${docRef}`)));
    StartDoc.then(async (response) => {
        const newData = await getDocs(query(LevelCollection, startAt(response), limit(2)));
        var it = 0;
        newData.forEach((f) => {
            renderCourse(f.data().course, levelClass[i], LevelCollection, it);
            it++;
        })
        if(it < 2){
            levelClass[i].querySelector(".fetching_data_text").textContent = "No more data";
        }
    }).catch((err) => {
        levelClass[i].querySelector(".fetching_data_text").textContent = "No more data";
    })
}


function PaginationCheck(level, i){
    level.addEventListener('scroll', () => {
        if(level.scrollLeft == (level.scrollWidth - level.offsetWidth)){
            PaginateLevel(i);
        }
    })
}

var levelCounter = 0;
levelClass.forEach((level) => {
    PaginationCheck(level, levelCounter);
    levelCounter++;
})


function PaginateCourse(level, courseName){
    //const CourseRef = query(collection(goalDoc, `${i}`), where("course", "=", `${courseName}`));
    //const StartAtCourse = level.querySelector(`#${courseName}`);
    //console.log(StartAtCourse.id);
    console.log("In Scroll for ", courseName);
}