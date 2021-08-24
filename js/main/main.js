var index = document;
var submit = index.getElementById("submit");

var theme = index.getElementById("switch");

theme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    theme.style.transform = "rotate3d(1, 1, 1, 360deg)"
    if(theme.value == "Light"){
        theme.value = "Dark";
        theme.style.color = "#000";
    }
    else{
        theme.value = "Light";
        theme.style.color = "#fff";
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