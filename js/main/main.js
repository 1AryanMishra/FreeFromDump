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