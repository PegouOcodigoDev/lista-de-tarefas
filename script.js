const taskBar = document.querySelector("#task-bar");
const listBox = document.querySelector(".list-box");
let tasks = document.querySelectorAll(".task");

let state = [];

function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}

function createTask(content) {
    const taskHTML = `<div class="task">
        <p>${content}</p>
        <div>
        <button onclick="deleteTask()"><i class="fa-regular fa-trash-can"></i></button>
        <input onchange="sortTask()" type="checkbox">
        </div>
    </div>`;

    listBox.innerHTML += taskHTML;
    tasks = document.querySelectorAll(".task");
}

function addTask(event) {
    if (tasks.length == 0 && taskBar.value){
        const space = document.querySelector(".space");
        space.remove();
    }
    event.preventDefault();
    if(taskBar.value){
    createTask(capitalizeWords(taskBar.value.trim()));
    state.push({
        description: capitalizeWords(taskBar.value.trim()),
        checked: false,
    });
    taskBar.value = "";
}
}

function sortTask() {
    const tasksChecked = [];
    const tasksNotChecked = [];
    listBox.innerHTML = "";

    tasks.forEach((task, index) => {
        const checkbox = task.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            tasksChecked.push(task);
        } else {
            tasksNotChecked.push(task);
        }
        state[index].checked = checkbox.checked;
    });

    tasksNotChecked.forEach((task) => {
        listBox.appendChild(task);
    });

    tasksChecked.forEach((task) => {
        listBox.appendChild(task);
    });
}
function updateCheckbox() {
    tasks.forEach((task, index) => {
        const checkbox = task.querySelector("input[type='checkbox']");
        checkbox.checked = state[index].checked;
    });
}

function deleteTask(task) {
    listBox.removeChild(task);

    tasks = document.querySelectorAll(".task");
    const taskIndex = Array.from(tasks).indexOf(task);
    if (taskIndex !== -1) {
        state.splice(taskIndex, 1);
    }
}