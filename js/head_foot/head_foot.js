const index = document;
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
    const top = index.querySelector("#top_nav_bar");
    const mid = index.querySelector("#mid_nav_bar");
    const bottom = index.querySelector("#bottom_nav_bar");

    if(nav_open){
        top.style.transform += "rotateZ(-25deg)";
        top.style.width = '20px';
        bottom.style.transform = "rotateZ(25deg)";
        bottom.style.width = '20px';
    }
    else{
        top.style.width = '30px';
        top.style.transform = "rotateZ(0deg)";
        bottom.style.width = '30px';
        bottom.style.transform = "rotateZ(0deg)";
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