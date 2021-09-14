import db from '../first_page/db1.js';


function prerequisites(prereq){
    var prereq_list = `<ul class="prerequisites">Prerequisites : `;
    prereq.forEach((p) => {
        prereq_list += `<li>${p}</li>`
    })
    prereq_list += "</ul>";
    return prereq_list;
}


function description(desc, prereq){
    return (
        `<section class="description">
            <div class="provider">
                <div class="provider_logo"><img src="" alt="ChannelDp"></div>
                <div class="provider_name"><h3>ChannelTitle</h3></div>
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




function resource_container(course_detail){
    return (
        `<li class = "resource_details">
            <iframe class = "demo_player" width="560" height="315" src="https://www.youtube.com/embed/${course_detail.videoId}?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            ${description(course_detail.description, course_detail.prerequisites)}
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



function resource_area(db){
    var resources_area_part = "";
    for(var i = 0; i < db.length; i++){
        resources_area_part += resources(db[i]);
    }
    return resources_area_part;
}



var levels = document.querySelectorAll(".resources_area");

for(var i = 0; i < levels.length; i++){
    levels[i].innerHTML = `${resource_area(db[i])}`;
}
