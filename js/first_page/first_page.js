import db from '../../database/firestore.js'
import { collection, limit, doc, getDoc, orderBy, getDocs, query, startAfter, startAt } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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
                    <h2 class="fetching_data_text">No More Data</h2>
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


function renderCourse(CourseName, level, docRef){
    var res_area_html = `${RenderCourseList(CourseName)}`;
    const CourseData = getDocs(query(collection(docRef, 'resources')));

    //Rendering Internal Resources List of Course

    CourseData.then((response) => {
        response.forEach((d) => {
            const course = d.data();
            res_area_html += `<li class = "resource_details">
            <iframe class = "demo_player" src="https://www.youtube.com/embed/${course.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        
            res_area_html += description(course.channelLink, course.logo, course.title, course.description, course.prerequisites);
        
            res_area_html += "</li>";
        })
        res_area_html += "</section></li>";
        level.innerHTML += res_area_html;
        level.querySelector(`#${remove_whiteSpace(CourseName)}`).scroll({
            top : 0,
            left : 0,
            behaviour : 'smooth'
        });
    })
}



function renderLevel(level, i){
    const LevelCollection = collection(goalDoc, `${i}`);
    const CourseQ = query(LevelCollection, limit(2));
    const course_name = getDocs(CourseQ);
    var it = 0;
    course_name.then((response) => {
        response.forEach((f) => {
            const docRef = doc(LevelCollection, `${it}`);
            renderCourse(f.data().course, level, docRef);
            it++;
        })
        level.scroll({
            top : 0,
            left : 0,
            behaviour : 'smooth'
        })
    });
}



/* ------- Rendering Levels ------- */

const levelClass = document.querySelectorAll(".resources_area");

renderLevel(levelClass[0], 0);
renderLevel(levelClass[1], 1);
renderLevel(levelClass[2], 2);






/* ------- PAGINATION FUNCTION -------  */

function PaginateLevel(i){
    var docRefPos = levelClass[i].childElementCount - 1;
    const LevelCollection = collection(goalDoc, `${i}`);
    
    var docRef = doc(LevelCollection, `${docRefPos}`);
    const StartDoc = getDoc(query(docRef));
    StartDoc.then((response) => {
        //RENDERING GOT DATA
        renderCourse(response.data().course, levelClass[i], docRef);

        //FETCHING SECOND DATA
        docRefPos++;
        docRef = doc(LevelCollection, `${docRefPos}`);
        const newDoc = getDoc(query(docRef));
        
        //RENDERING NEW DATA
        newDoc.then((response) => {
            renderCourse(response.data().course, levelClass[i], docRef);
        }).catch((err) => {
            levelClass[i].querySelector('.more_data_resources').style.display = 'none';
        })

    }).catch((err) => {
        levelClass[i].querySelector('.more_data_resources').style.display = 'none';
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


function StartFromHere(){
    //const setUserData = doc('users', '')
}