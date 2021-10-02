import db from '../../database/firestore.js'
import { collection, orderBy, limit, doc, getDoc, getDocs, query, startAfter, endAt } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

sessionStorage.setItem("isActive", "1");

const SelectedField = JSON.parse(localStorage.getItem('goal'));


const goalDoc = doc(db, 'fields', `${SelectedField}`);



function prerequisites(prereq){
    var prereq_list = `<ul class="prerequisites">Prerequisites : `;
    for(var i = 0; i<prereq.length; i++){
        prereq_list += `<li>${prereq[i]}</li>`
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


<<<<<<< HEAD
=======


>>>>>>> firstPage
function resource_container(course_detail){
    return (
        `<li class = "resource_details">
            <iframe class = "demo_player" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            ${description(course_detail.channelLink, course_detail.logo, course_detail.title, course_detail.description, course_detail.prerequisites)}
        </li>`
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



const levelClass = document.querySelectorAll(".resources_area");



// RENDER LEVEL RESOURCE DATA TO BROWSER



function RenderCourseList(course_name){
    return( 
        `<li class="resources">
            <button class="prev_btn_res">
                <div class="arrow_top_res"></div>
                <div class="arrow_bottom_res"></div>
            </button>

            <button class="next_btn_res">
                <div class="arrow_top_res"></div>
                <div class="arrow_bottom_res"></div>
            </button>

            <h2 class = "resource_name">${course_name}</h2>
            <section class="resource_container">
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



for(var i = 0; i<2; i++){
    const LevelCollection = collection(goalDoc, `${i}`);
    var resources_area = levelClass[i];
    for(var j = 0; j<2; j++){
        const CourseSection = doc(LevelCollection, `${j}`);
        const course_name = await getDoc(CourseSection);
        
        var resources_area_html = `${RenderCourseList(course_name.data().course)}`;

        for(var k = 0; k<2; k++){
            const CourseData = await getDoc(query(doc(CourseSection, 'resources', `${k}`)));
            
            resources_area_html += `${resource_container(CourseData.data())}`;
        }

        resources_area_html += "</section></li>";
        
        resources_area.innerHTML += resources_area_html;
    }
}



// FOR EXPERT LEVEL AS IT HAS ONLY ONE RESOURCE IN EACH COURSE
const LevelCollection = collection(goalDoc, `2`);
var exp_resources_area = levelClass[2]
for(var j = 0; j<2; j++){
    const CourseSection = doc(LevelCollection, `${j}`);
    const course_name = await getDoc(CourseSection);
    
    var exp_resources_area_html = `${RenderCourseList(course_name.data().course)}`;

    for(var k = 0; k<1; k++){
        const CourseData = await getDoc(query(doc(CourseSection, 'resources', `${k}`)));
        
        exp_resources_area_html += `${resource_container(CourseData.data())}`;
    }

    exp_resources_area_html += "</section></li>";
    
    exp_resources_area.innerHTML += exp_resources_area_html;
}





// --------SCROLL BUTTONS-------

const beg_prev = document.querySelector("#beg_prev");
const beg_next = document.querySelector("#beg_next");
const int_prev = document.querySelector("#int_prev");
const int_next = document.querySelector("#int_next");
const exp_prev = document.querySelector("#exp_prev");
const exp_next = document.querySelector("#exp_next");


var beg_pos = [0];
var int_pos = [0];
var exp_pos = [0];

function populatePosArrayForRes(levelArea, levelArr){
    for(var i = 0; i<levelArea.childElementCount - 1; i++){
        levelArr.push(0);
    }
}

populatePosArrayForRes(levelClass[0], beg_pos);
populatePosArrayForRes(levelClass[1], int_pos);
populatePosArrayForRes(levelClass[2], exp_pos);




function checkScrollVisibilityOnLoad(){
    if(levelClass[0].childElementCount > 1){
        beg_next.style.display = 'block'
    }
    if(levelClass[1].childElementCount > 1){
        int_next.style.display = 'block'
    }
    if(levelClass[2].childElementCount > 1){
        exp_next.style.display = 'block'
    }
}

checkScrollVisibilityOnLoad();



function checkScrollVisibility(leftBtn, rightBtn, levelPos, levelAreaElements){
    if(levelPos <= 0){
        leftBtn.style.display = 'none';
    }
    else{
        leftBtn.style.display = 'block';
    }

    if(levelPos >= levelAreaElements - 1){
        rightBtn.style.display = 'none';
    }
    else{
        rightBtn.style.display = 'block';
    }
}



beg_prev.addEventListener("click", () => {
    if(beg_pos[0] > 0){
        beg_pos[0] -= 1;
        checkScrollVisibility(beg_prev, beg_next, beg_pos[0], levelClass[0].childElementCount);
        levelClass[0].scroll({
            top : 0,
            left : levelClass[0].offsetWidth*beg_pos[0],
            behavior : 'smooth'
        })
    }
})


beg_next.addEventListener("click", () => {
    if(beg_pos[0] < levelClass[0].childElementCount-1){
        beg_pos[0] += 1;
        checkScrollVisibility(beg_prev, beg_next, beg_pos[0], levelClass[0].childElementCount);
        levelClass[0].scroll({
            top : 0,
            left : levelClass[0].offsetWidth*beg_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(levelClass[0], beg_pos[0]);
})


int_prev.addEventListener("click", () => {
    if(int_pos[0] > 0){
        int_pos[0] -= 1;
        checkScrollVisibility(int_prev, int_next, int_pos[0], levelClass[1].childElementCount);
        levelClass[1].scroll({
            top : 0,
            left : levelClass[1].offsetWidth*int_pos[0],
            behavior : 'smooth'
        })
    }
})

int_next.addEventListener("click", () => {
    if(int_pos[0] < levelClass[1].childElementCount-1){
        int_pos[0] += 1;
        checkScrollVisibility(int_prev, int_next, int_pos[0], levelClass[1].childElementCount);
        levelClass[1].scroll({
            top : 0,
            left : levelClass[1].offsetWidth*int_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(levelClass[1], int_pos[0]);
})


exp_prev.addEventListener("click", () => {
    if(exp_pos[0] > 0){
        exp_pos[0] -= 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos[0], levelClass[2].childElementCount);
        levelClass[2].scroll({
            top : 0,
            left : levelClass[2].offsetWidth*exp_pos[0],
            behavior : 'smooth'
        })
    }
})


exp_next.addEventListener("click", () => {
    if(exp_pos[0] < levelClass[2].childElementCount-1){
        exp_pos[0] += 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos[0], levelClass[2].childElementCount);
        levelClass[2].scroll({
            top : 0,
            left : levelClass[2].offsetWidth*exp_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(levelClass[2], exp_pos[0]);
})



// -------- RESOURCES SCROLL BTNS -------

function LevelResScrollBtn(level, level_pos){

    if(level_pos < level.childElementCount - 1 || level_pos == 0){
        
        const course_res = level.children[level_pos + 1];
        const course_res_scrollArea = course_res.querySelector('.resource_container');
        const leftBtn = course_res.querySelector(".prev_btn_res");
        const rightBtn = course_res.querySelector(".next_btn_res");

        if(course_res_scrollArea.childElementCount > 1){
            rightBtn.style.display = 'block';
        }

        leftBtn.addEventListener('click', () => {
            if(level == levelClass[0] && beg_pos[level_pos + 1] > 0){
                beg_pos[level_pos + 1] -= 1;
                checkScrollVisibility(leftBtn, rightBtn, beg_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*beg_pos[level_pos+1],
                    behavior : 'smooth'
                })
            }
            else if(level == levelClass[1] && int_pos[level_pos + 1] > 0){
                int_pos[level_pos + 1] -= 1;
                checkScrollVisibility(leftBtn, rightBtn, int_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*int_pos[level_pos+1],
                    behavior : 'smooth'
                })
            }
            else if(exp_pos[level_pos + 1] > 0){
                exp_pos[level_pos + 1] -= 1;
                checkScrollVisibility(leftBtn, rightBtn, exp_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*exp_pos[level_pos+1],
                    behavior : 'smooth'
                })
            }
        })
        rightBtn.addEventListener('click', () => {
            if(level == levelClass[0] && beg_pos[level_pos + 1] < course_res_scrollArea.childElementCount - 1){
                beg_pos[level_pos + 1] += 1;
                checkScrollVisibility(leftBtn, rightBtn, beg_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*beg_pos[level_pos + 1],
                    behavior : 'smooth'
                })
            }
            else if(level == levelClass[1]  && int_pos[level_pos + 1] < course_res_scrollArea.childElementCount - 1){
                int_pos[level_pos + 1] += 1;
                checkScrollVisibility(leftBtn, rightBtn, int_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*int_pos[level_pos + 1],
                    behavior : 'smooth'
                })
            }
            else if(exp_pos[level_pos + 1] < course_res_scrollArea.childElementCount - 1){
                exp_pos[level_pos + 1] += 1;
                checkScrollVisibility(leftBtn, rightBtn, exp_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*exp_pos[level_pos + 1],
                    behavior : 'smooth'
                })
            }
        })
    }
}

LevelResScrollBtn(levelClass[0], beg_pos[0]);
LevelResScrollBtn(levelClass[1], int_pos[0]);
LevelResScrollBtn(levelClass[2], exp_pos[0]);
