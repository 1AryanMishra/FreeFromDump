import db from '../../database/firestore.js'
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

sessionStorage.setItem("isActive", "1");

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


<<<<<<< HEAD
/* 
TO BE ADDED BEFORE PUSHING  OR  MERGING 

<img class = "demo_player" src = "../images/resources/beginner/css/courses/f.jpg" alt = "course demo player">
=======
/* To be added in resource_container before description

<iframe class = "demo_player" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
>>>>>>> firstPage

*/

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



function resources(db){
    var resource_list = `<li class="resources" id = "${remove_whiteSpace(db.course)}">
                            <button id="#${remove_whiteSpace(db.course)}_prev" class="prev_btn_res">
                                <div class="arrow_top_res"></div>
                                <div class="arrow_bottom_res"></div>
                            </button>

                            <button id="#${remove_whiteSpace(db.course)}_next" class="next_btn_res">
                                <div class="arrow_top_res"></div>
                                <div class="arrow_bottom_res"></div>
                            </button>`;
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



// RENDER LEVEL RESOURCE DATA TO BROWSER
function renderToLevel(levelArea, levelData){
    levelData.forEach((d) => {
        levelArea.innerHTML += `${resources(d)}`;
    })
}

renderToLevel(beginnerArea, beginnerData);
renderToLevel(intermediateArea, intermediateData);
renderToLevel(expertArea, expertData);




/* --------SCROLL BUTTONS-------  */

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

populatePosArrayForRes(beginnerArea, beg_pos);
populatePosArrayForRes(intermediateArea, int_pos);
populatePosArrayForRes(expertArea, exp_pos);




function checkScrollVisibilityOnLoad(){
    if(beginnerArea.childElementCount > 1){
        beg_next.style.display = 'block'
    }
    if(intermediateArea.childElementCount > 1){
        int_next.style.display = 'block'
    }
    if(expertArea.childElementCount > 1){
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
        checkScrollVisibility(beg_prev, beg_next, beg_pos[0], beginnerArea.childElementCount);
        beginnerArea.scroll({
            top : 0,
            left : beginnerArea.offsetWidth*beg_pos[0],
            behavior : 'smooth'
        })
    }
})


beg_next.addEventListener("click", () => {
    if(beg_pos[0] < beginnerArea.childElementCount-1){
        beg_pos[0] += 1;
        checkScrollVisibility(beg_prev, beg_next, beg_pos[0], beginnerArea.childElementCount);
        beginnerArea.scroll({
            top : 0,
            left : beginnerArea.offsetWidth*beg_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(beginnerArea, beg_pos[0]);
})


int_prev.addEventListener("click", () => {
    if(int_pos[0] > 0){
        int_pos[0] -= 1;
        checkScrollVisibility(int_prev, int_next, int_pos[0], intermediateArea.childElementCount);
        intermediateArea.scroll({
            top : 0,
            left : intermediateArea.offsetWidth*int_pos[0],
            behavior : 'smooth'
        })
    }
})

int_next.addEventListener("click", () => {
    if(int_pos[0] < intermediateArea.childElementCount-1){
        int_pos[0] += 1;
        checkScrollVisibility(int_prev, int_next, int_pos[0], intermediateArea.childElementCount);
        intermediateArea.scroll({
            top : 0,
            left : intermediateArea.offsetWidth*int_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(intermediateArea, int_pos[0]);
})


exp_prev.addEventListener("click", () => {
    if(exp_pos[0] > 0){
        exp_pos[0] -= 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos[0], expertArea.childElementCount);
        expertArea.scroll({
            top : 0,
            left : expertArea.offsetWidth*exp_pos[0],
            behavior : 'smooth'
        })
    }
})


exp_next.addEventListener("click", () => {
    if(exp_pos[0] < expertArea.childElementCount-1){
        exp_pos[0] += 1;
        checkScrollVisibility(exp_prev, exp_next, exp_pos[0], expertArea.childElementCount);
        expertArea.scroll({
            top : 0,
            left : expertArea.offsetWidth*exp_pos[0],
            behavior : 'smooth'
        })
    }
    LevelResScrollBtn(expertArea, exp_pos[0]);
})



/* RESOURCES SCROLL BTNS */

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
            if(level == beginnerArea && beg_pos[level_pos + 1] > 0){
                beg_pos[level_pos + 1] -= 1;
                checkScrollVisibility(leftBtn, rightBtn, beg_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*beg_pos[level_pos+1],
                    behavior : 'smooth'
                })
            }
            else if(level == intermediateArea && int_pos[level_pos + 1] > 0){
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
            if(level == beginnerArea && beg_pos[level_pos + 1] < course_res_scrollArea.childElementCount - 1){
                beg_pos[level_pos + 1] += 1;
                checkScrollVisibility(leftBtn, rightBtn, beg_pos[level_pos + 1], course_res_scrollArea.childElementCount);
                course_res_scrollArea.scroll({
                    top : 0,
                    left : course_res_scrollArea.offsetWidth*beg_pos[level_pos + 1],
                    behavior : 'smooth'
                })
            }
            else if(level == intermediateArea  && int_pos[level_pos + 1] < course_res_scrollArea.childElementCount - 1){
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

LevelResScrollBtn(beginnerArea, beg_pos[0]);
LevelResScrollBtn(intermediateArea, int_pos[0]);
LevelResScrollBtn(expertArea, exp_pos[0]);