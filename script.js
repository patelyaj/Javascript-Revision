let container1 = document.querySelector('.container1');
let taskList = document.querySelector('.task-list');

// task inputs
let taskDescription = document.querySelector('.task');
let taskDate = document.querySelector('.date');

container1.classList.add('hidden');

let todo = [];
// localStorage.setItem("mytask",[]);
let id = 1;
let currentId;

window.onload = () => {
    let actualFormat = JSON.parse(localStorage.getItem("mytask"));

    if (actualFormat.length != 0) {
        for (let x in actualFormat) {
            if (actualFormat[x][0] > id) {
                id = actualFormat[x][0];
            }
        }
        id++;
        for (let x in actualFormat) {
            todo.push([actualFormat[x][0], actualFormat[x][1], actualFormat[x][2], actualFormat[x][3]]);
            displayTask(actualFormat[x][0], actualFormat[x][1], actualFormat[x][2], actualFormat[x][3]);
        }
    }
}

let temp = []
// add task
function addTask() {
    let taskName = taskDescription.value;
    let taskDateValue = taskDate.value;
    todo.push([id, taskName, taskDateValue, false]);

    localStorage.setItem("mytask", JSON.stringify(todo));

    console.log(todo);
    displayTask(id, taskName, taskDateValue, false);
    toggle()
    id++;

    // clearing the value
    taskDescription.value = "";
    taskDate.value = "";
    // task-list
}

function toggle() {
    if (container1.hasAttribute('class', 'hidden')) {
        container1.classList.remove('hidden');
        container1.classList.add('visible');
    }
    else {
        container1.classList.remove('visible');
        container1.classList.add('hidden');
    }
}



function createNewContainerForTask(id, taskName, taskDateValue, status) {

    let newInnerContainer = document.createElement('div');
    let taskSpan = document.createElement('span');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let markAsCompleted = document.createElement('button');

    newInnerContainer.classList.add('innercontainer');
    taskList.appendChild(newInnerContainer);

    taskSpan.classList.add('taskspan');
    taskSpan.innerHTML = taskName;


    // edit button
    editButton.classList.add('editbtn');
    editButton.addEventListener("click", () => {
        let inp1 = document.createElement('input');
        inp1.value = taskName;
        inp1.style.width = '3rem';
        let inp2 = document.createElement('input');
        inp2.type = 'datetime-local';
        inp2.style.width = '3rem';
        inp2.value = taskDateValue;
        let saveBtn = document.createElement('button');
        saveBtn.innerText = "Save";

        newInnerContainer.replaceChild(saveBtn, editButton);
        newInnerContainer.replaceChild(inp2, taskSpan);
        newInnerContainer.prepend(inp1);

        saveBtn.addEventListener("click", () => {
            for (let x in todo) {
                if (todo[x][0] == id) {
                    todo[x][1] = inp1.value;
                    todo[x][2] = inp2.value;
                }
            }
            localStorage.setItem("mytask", JSON.stringify(todo));
            console.log(todo);

            displayTask();
        });
    });
    editButton.setAttribute('id', id);
    editButton.innerHTML = "edit"

    // delete button
    deleteButton.classList.add('deletebtn');
    deleteButton.setAttribute('id', id);
    deleteButton.addEventListener("click", () => { callDelete(id) });
    deleteButton.innerHTML = "delete";

    // mark as completed
    markAsCompleted.classList.add('completedbtn');
    markAsCompleted.setAttribute('id', id);

    // appending childs
    newInnerContainer.appendChild(taskSpan);
    

    newInnerContainer.appendChild(deleteButton);

    if (status == false) {
        // default whilte 
        newInnerContainer.appendChild(editButton);  
        newInnerContainer.appendChild(markAsCompleted);
        markAsCompleted.innerHTML = "mark as completed"
        markAsCompleted.addEventListener("click", () => { callMarkAsCompleted(id) });
    }
    else {
        newInnerContainer.style.backgroundColor = "lightgreen";
        newInnerContainer.appendChild(markAsCompleted);
        markAsCompleted.innerHTML = "undo";
        markAsCompleted.addEventListener("click", () => { callUndo(id) });
    }
    // }
}
let z = document.querySelector('.taskedit');
let y = document.querySelector('.dateedit');



function displayTask() {
    taskList.innerHTML = "";
    for (let x in todo) {
        createNewContainerForTask(todo[x][0], todo[x][1], todo[x][2], todo[x][3]);
    }
}

function callDelete(id) {
    taskList.innerHTML = "";
    // let temp = [];
    // for (let x in todo) {
    //     if(todo[x][0] != id){
    //         displayTask(todo[x][0], todo[x][1], todo[x][2]);
    //     }
    // }

    todo = todo.filter(tid => tid[0] != id);

    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displayTask();
}

function callMarkAsCompleted(id) {
    for (let x in todo) {
        if (todo[x][0] == id) {
            todo[x][3] = true;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displayTask();
}

function callUndo(id) {
    for (let x in todo) {
        if (todo[x][0] == id) {
            todo[x][3] = false;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displayTask();
}

function sortByDate() {
    todo.sort((a, b) => {
        return new Date(a[2]) - new Date(b[2]);
    });

    localStorage.setItem("mytask", JSON.stringify(todo));
    displayTask();
}

function sortByName() {
    todo.sort((a, b) => {
        return a[1].localeCompare(b[1]);
    });

    localStorage.setItem("mytask", JSON.stringify(todo));
    displayTask();
}

function search() {
    let searchText = document.querySelector('.searchbox').value;
    console.log(searchText);
    let z = todo.filter((x)=>{
        return x[1].toLowerCase().includes(searchText.toLowerCase());
    })
    console.log(z);
    taskList.innerHTML = "";
    for(let i in z){
        console.log(z[i][0]);
        console.log(z[i][1]);
        createNewContainerForTask(z[i][0],z[i][1],z[i][2],z[i][3]);
    }
}