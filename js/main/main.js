var index = document;
var submit = index.getElementById("submit");

var theme = index.getElementById("switch");

theme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(theme.value == "Light"){
        theme.style.transform = "rotateZ(360deg)";
        theme.value = "Dark";
    }
    else{
        theme.style.transform = "rotateZ(-360deg)";
        theme.value = "Light";
    }

})

var nav = index.getElementById("nav_open_btn");

var nav_open = false;

function navBoxAnimation(){
    if(nav_open){
        index.querySelector("#top_nav_bar").style.transform = "translateY(12px)";
        index.getElementById("mid_nav_bar").style.display = "none";
        index.querySelector("#bottom_nav_bar").style.transform = "translateY(-12px)";
        index.querySelector("#top_nav_bar").style.transform += "rotateZ(45deg)";
        index.querySelector("#bottom_nav_bar").style.transform = "rotateZ(-45deg)";
    }
    else{
        index.querySelector("#top_nav_bar").style.transform = "translateY(0px)";
        index.querySelector("#bottom_nav_bar").style.transform = "translateY(0px)";
        index.querySelector("#top_nav_bar").style.transform = "rotateZ(0deg)";
        index.querySelector("#bottom_nav_bar").style.transform = "rotateZ(0deg)";
        index.getElementById("mid_nav_bar").style.display = "block";
    }
}

function showNav(){
    nav_open = true;
    navBoxAnimation();
    index.getElementById("nav").style.flexDirection = "column";
    index.getElementById("nav_section").style.display = "flex";
    index.getElementById("nav_section").style.order = "1";
    index.getElementById("nav_section").style.marginRight = "0";
}

function hideNav(){
    nav_open = false;
    navBoxAnimation();
    index.getElementById("nav").style.flexDirection = "row";
    index.getElementById("nav_section").style.display = "none";
}

nav.addEventListener("click", () => {
    if(nav_open){
        hideNav();
    }
    else{
        showNav();
    }
})



var data;
function formAction(){
    var time = index.getElementById("time_number").value + index.getElementById("time_format").value;
    var field = index.getElementById("field").value;
    data = {
        goal : field,
        time : time
    };
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('data')));
}

submit.addEventListener("click", formAction);