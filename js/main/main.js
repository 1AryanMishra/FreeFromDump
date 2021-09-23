import db from '../../database/firestore.js'
import { collection, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";




const submit = document.getElementById("submit");

const goal = document.getElementById("field");
const goal_msg = document.querySelector("#goal_msg");

const pc_checkbox = document.querySelector("#pc_checkbox");

const time_number = document.getElementById("time_number");
const time_format = document.getElementById("time_format");
const time_msg = document.querySelector("#time_msg");



function resetForm(){
    
    goal_msg.textContent = "Select your Goal";
    goal.value = "none";

    pc_checkbox.checked = false;

    time_number.value = "";
    time_format.value = 'd';
    time_msg.textContent = "Expected Time";
}



function formAction(){
    var t = 1;
    var g = 1;

    const data = {
        goal : goal.value,
        pc_checkbox_state : pc_checkbox.checked,
        time : time_number.value + time_format.value
    };

    if(data.goal == "none"){
        goal_msg.style.color = "rgb(255, 0, 0)";
        goal_msg.textContent = "Please choose one field from the Drop-Down to proceed.";
        g = 0;
    }
    else{
        goal_msg.style.color = "var(--baseFont)";
        goal_msg.textContent = `Thank You!, we will get you best for ${data.goal}`;
    }

    if(data.time == "Days" || data.time == "0Days"){
        time_msg.style.color = 'rgb(255, 0, 0)';
        time_msg.textContent = "Please Input what time you expect this course should take.";
        t = 0;
        return;
    }
    else{
        time_msg.style.color = 'var(--baseFont)';
        time_msg.textContent = `Thank You!, you will get The Best in ${time_number.value + " " + time_format.value}`;
    }

    if(t == 1 && g == 1){
        submit.href = "pages/first_page.html";
        localStorage.clear();
        localStorage.setItem('goal', JSON.stringify(data.goal));
        resetForm();
        return;
    }
}

submit.addEventListener("click", formAction);