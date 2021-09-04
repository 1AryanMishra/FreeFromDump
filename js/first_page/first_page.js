import db from '../first_page/db.js';

const resource_name = `<h2 class = "resource_name">HTML</h2>`;


const suggested_container = `<section class="suggested_container">
    <li id="first_link">
        <a href="#"><img src="../images/resources/beginner/html/courses/t1.jpg" alt="1"></a>
    </li>

    <li>
        <a href="#"><img src="../images/resources/beginner/html/courses/t1.jpg" alt="1"></a>
    </li>

    <li>
        <a href="#"><img src="../images/resources/beginner/html/courses/t3.jpg" alt="1"></a>
    </li>

    <li>
        <a href="#"><img src="../images/resources/beginner/html/courses/f.jpg" alt="1"></a>
    </li>

    <li id="last_link">
        <a href="#"><img src="../images/resources/beginner/html/courses/g.jpg" alt="4"></a>
    </li>
</section>`;





const provider_logo = `<div class="provider_logo"><img src="../images/resources/beginner/html/logos/traversy.jpg"></div>`;
const provider_name = `<div class="provider_name"><h3>Resource Provider</h3></div>`;

const provider = `<div class="provider">
${provider_logo}
${provider_name}
</div>`;


const some_text = `<p class="some_text">Some text about the resource selected above to play in player section.</p>`;
const prerequisites = `<ul class="prerequisites">
<li>Some prerequisites to follow before taking this course.</li>
<li>Like this</li>
<li>And this</li>
</ul>`;



const is_fav = `<button class = "is_fav" id = "html">!Fav</button>`;
const add_to_list = `<button class = "add_to_list">Watch later</button>`

const course_action = `<div class = "course_action">
${is_fav}
${add_to_list}
</div>`;

const description = `<section class="description">
${provider}
${some_text}
${prerequisites}
${course_action}
</section>`;




const resource_intro = `<div class="resource_intro">
${suggested_container}
${description}
</div>`;




const resource_data = `<div class="resource_data">
${resource_name}
${resource_intro}
</div>`;



const resources = `<li class="resources">
${resource_data}
</li>`;


var beginner_level = document.querySelectorAll(".resources_area");

beginner_level.forEach(element => {
    element.innerHTML = `${resources} ${resources}`;
});


