'use strict';

let tasks = [];

const $task = document.getElementById('task');
const $addTask = document.getElementById('addTask');
const $todoList = document.getElementById('todo-list');
const $completedList = document.getElementById('completed-list');
const taskLiHTML = document.getElementById('task-li').innerHTML;

function add(event) {
    event.preventDefault();
    const todo = $task.value;

    if (todo === "") {
        return false;
    }

    const task = {
        pos: tasks.length,
        todo: todo,
        completed: false,
        deleted: false,
    };

    tasks.push(task);

    $task.value = "";

    render();
    console.log(tasks);
}

function complete($this) {
    const pos = $this.dataset.pos;

    tasks[pos].completed = !tasks[pos].completed;

    render();
}

function del($this) {
    const pos = $this.dataset.pos;

    tasks[pos].deleted = true;

    render();    
}

function edit($this) {
    const pos = $this.dataset.pos;
    const $btnSave = document.querySelector(".btn--save[data-pos='"+pos+"']");
    const $label = document.querySelector("label[data-pos='"+pos+"']");
    const $input = document.querySelector("input[type='text'][data-pos='"+pos+"']");
    
    $this.style.display = 'none';
    $btnSave.style.display = 'inline-block';
    $label.style.display = 'none';
    $input.style.display = 'inline-block';
}

function save($this) {
    const pos = $this.dataset.pos;
    const $input = document.querySelector("input[type='text'][data-pos='"+pos+"']");

    tasks[pos].todo = $input.value;

    render();
}

function render() {
    let todoListHTML = '';
    let completedListHTML = '';

    tasks.forEach(function (task) {
        if (task.deleted === true) {
            return false;
        }

        let taskHTML = taskLiHTML
            .replace(/{{ pos }}/ig, task.pos)
            .replace(/{{ todo }}/ig, task.todo)
            .replace(/{{ completed }}/ig, task.completed ? 'checked' : '');

        if (task.completed === true) {
            completedListHTML += taskHTML;
        } else {
            todoListHTML += taskHTML;
        }
    });

    $todoList.innerHTML = todoListHTML;
    $completedList.innerHTML = completedListHTML;
}

$addTask.onclick = add;