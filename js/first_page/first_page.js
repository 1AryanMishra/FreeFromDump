import db from '../first_page/db.js';

const resource_name = `<h2 class = "resource_name">HTML</h2>`;





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








const resource_container = `<section class="resource_container">
    <li class = "resource_details" id="first_link">
        <img class = "demo_player" src="../images/resources/beginner/html/courses/t1.jpg" alt="1">
        ${description}
    </li>

    <li class = "resource_details">
        <img class = "demo_player" src="../images/resources/beginner/html/courses/t1.jpg" alt="1">
        ${description}
    </li>

    <li class = "resource_details">
        <img class = "demo_player" src="../images/resources/beginner/html/courses/t3.jpg" alt="1">
        ${description}
    </li>

    <li class = "resource_details">
        <img class = "demo_player" src="../images/resources/beginner/html/courses/f.jpg" alt="1">
        ${description}
    </li>

    <li class = "resource_details" id="last_link">
        <img class = "demo_player" src="../images/resources/beginner/html/courses/g.jpg" alt="4">
        ${description}
    </li>
</section>`;





const resources = `<li class="resources">
${resource_name}
${resource_container}
</li>`;


var beginner_level = document.querySelectorAll(".resources_area");

beginner_level.forEach(element => {
    element.innerHTML = `${resources} ${resources}`;
});


