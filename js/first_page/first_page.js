import db from '../first_page/db.js';

const resource_name = `<h2 class = "resource_name">HTML</h2>`;


const player = `<section class="player"><img src="../images/resources/beginner/html/courses/t1.jpg" alt="the selected one to play"></section>`;
const suggested_container = `<section class="suggested_container">
    <ul>
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
</ul>
</section>`;

const images = `<section class = "images">
${player}
${suggested_container}
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

const description = `<section class="description">
${provider}
${some_text}
${prerequisites}
</section>`;




const resource_intro = `<div class="resource_intro">
${images}
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