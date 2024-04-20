const taskBar = document.querySelector("#task-bar");
const listBox = document.querySelector(".list-box");
let tasks = document.querySelectorAll(".task");

let state = [];

function createTask(content) {
    const taskHTML = `<div class="task">
        <p>${content}</p>
        <input onchange="sortTask()" type="checkbox">
    </div>`;

    listBox.innerHTML += taskHTML;
    tasks = document.querySelectorAll(".task");
}

function addTask(event) {
    event.preventDefault();
    createTask(taskBar.value);
    state.push({
        description: taskBar.value,
        checked: false,
    });
    taskBar.value = "";
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

function update() {
    tasks.forEach((task, index) => {
        const checkbox = task.querySelector("input[type='checkbox']");
        checkbox.checked = state[index].checked;
    });
}