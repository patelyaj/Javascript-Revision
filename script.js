let taskEntryContainer = document.querySelector('.container1'); // renamed from container1
let taskListDisplay = document.querySelector('.task-list'); // renamed from taskList

// task inputs
let taskDescriptionInput = document.querySelector('.task');
let taskDateInput = document.querySelector('.date');

taskEntryContainer.classList.add('hidden');

let todoList = []; // renamed from todo
// localStorage.setItem("mytask",[]);
let taskIdCounter = 1; // renamed from id
let currentTaskId;

window.onload = () => {
    let savedTasks = JSON.parse(localStorage.getItem("mytask")); // renamed from actualFormat

    if (savedTasks && savedTasks.length != 0) {
        for (let x in savedTasks) {
            if (savedTasks[x][0] > taskIdCounter) {
                taskIdCounter = savedTasks[x][0];
            }
        }
        taskIdCounter++;
        for (let x in savedTasks) {
            todoList.push([savedTasks[x][0], savedTasks[x][1], savedTasks[x][2], savedTasks[x][3]]);
            renderTask(savedTasks[x][0], savedTasks[x][1], savedTasks[x][2], savedTasks[x][3]);
        }
    }
}

let temp = []
// add task
function addTask() {
    let taskName = taskDescriptionInput.value;
    let taskDateValue = taskDateInput.value;
    todoList.push([taskIdCounter, taskName, taskDateValue, false]);

    localStorage.setItem("mytask", JSON.stringify(todoList));

    console.log(todoList);
    renderTask(taskIdCounter, taskName, taskDateValue, false);
    toggleInputForm(); // renamed from toggle()
    taskIdCounter++;

    // clearing the value
    taskDescriptionInput.value = "";
    taskDateInput.value = "";
    // task-list
}

function toggleInputForm() { // renamed from toggle()
    if (taskEntryContainer.hasAttribute('class', 'hidden')) {
        taskEntryContainer.classList.remove('hidden');
        taskEntryContainer.classList.add('visible');
    }
    else {
        taskEntryContainer.classList.remove('visible');
        taskEntryContainer.classList.add('hidden');
    }
}

function renderTask(id, taskName, taskDateValue, status) { // renamed from createNewContainerForTask

    let newInnerContainer = document.createElement('div');
    let taskSpan = document.createElement('span');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let markAsCompletedButton = document.createElement('button');

    newInnerContainer.classList.add('innercontainer');
    taskListDisplay.appendChild(newInnerContainer);

    taskSpan.classList.add('taskspan');
    taskSpan.innerHTML = taskName;


    // edit button
    editButton.classList.add('editbtn');
    editButton.addEventListener("click", () => {
        let nameEditInput = document.createElement('input');
        nameEditInput.value = taskName;
        nameEditInput.style.width = '3rem';
        let dateEditInput = document.createElement('input');
        dateEditInput.type = 'datetime-local';
        dateEditInput.style.width = '3rem';
        dateEditInput.value = taskDateValue;
        let saveBtn = document.createElement('button');
        saveBtn.innerText = "Save";

        newInnerContainer.replaceChild(saveBtn, editButton);
        newInnerContainer.replaceChild(dateEditInput, taskSpan);
        newInnerContainer.prepend(nameEditInput);

        saveBtn.addEventListener("click", () => {
            for (let x in todoList) {
                if (todoList[x][0] == id) {
                    todoList[x][1] = nameEditInput.value;
                    todoList[x][2] = dateEditInput.value;
                }
            }
            localStorage.setItem("mytask", JSON.stringify(todoList));
            console.log(todoList);

            refreshTaskDisplay();
        });
    });
    editButton.setAttribute('id', id);
    editButton.innerHTML = "edit"

    // delete button
    deleteButton.classList.add('deletebtn');
    deleteButton.setAttribute('id', id);
    deleteButton.addEventListener("click", () => { deleteTask(id) });
    deleteButton.innerHTML = "delete";

    // mark as completed
    markAsCompletedButton.classList.add('completedbtn');
    markAsCompletedButton.setAttribute('id', id);

    // appending childs
    newInnerContainer.appendChild(taskSpan);
    

    newInnerContainer.appendChild(deleteButton);

    if (status == false) {
        // default whilte 
        newInnerContainer.appendChild(editButton);  
        newInnerContainer.appendChild(markAsCompletedButton);
        markAsCompletedButton.innerHTML = "mark as completed"
        markAsCompletedButton.addEventListener("click", () => { completeTask(id) });
    }
    else {
        newInnerContainer.style.backgroundColor = "lightgreen";
        newInnerContainer.appendChild(markAsCompletedButton);
        markAsCompletedButton.innerHTML = "undo";
        markAsCompletedButton.addEventListener("click", () => { undoTaskCompletion(id) });
    }
    // }
}

function refreshTaskDisplay() { // renamed from displayTask
    taskListDisplay.innerHTML = "";
    for (let x in todoList) {
        renderTask(todoList[x][0], todoList[x][1], todoList[x][2], todoList[x][3]);
    }
}

function deleteTask(id) { // renamed from callDelete
    taskListDisplay.innerHTML = "";

    todoList = todoList.filter(task => task[0] != id);

    localStorage.setItem("mytask", JSON.stringify(todoList));
    console.log(todoList);

    refreshTaskDisplay();
}

function completeTask(id) { // renamed from callMarkAsCompleted
    for (let x in todoList) {
        if (todoList[x][0] == id) {
            todoList[x][3] = true;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todoList));
    console.log(todoList);

    refreshTaskDisplay();
}

function undoTaskCompletion(id) { // renamed from callUndo
    for (let x in todoList) {
        if (todoList[x][0] == id) {
            todoList[x][3] = false;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todoList));
    console.log(todoList);

    refreshTaskDisplay();
}

function sortByDate() {
    todoList.sort((a, b) => {
        return new Date(a[2]) - new Date(b[2]);
    });

    localStorage.setItem("mytask", JSON.stringify(todoList));
    refreshTaskDisplay();
}

function sortByName() {
    todoList.sort((a, b) => {
        return a[1].localeCompare(b[1]);
    });

    localStorage.setItem("mytask", JSON.stringify(todoList));
    refreshTaskDisplay();
}

function searchTasks() { // renamed from search
    let searchText = document.querySelector('.searchbox').value;
    console.log(searchText);
    let filteredTasks = todoList.filter((task)=>{
        return task[1].toLowerCase().includes(searchText.toLowerCase());
    })
    console.log(filteredTasks);
    taskListDisplay.innerHTML = "";
    for(let i in filteredTasks){
        renderTask(filteredTasks[i][0], filteredTasks[i][1], filteredTasks[i][2], filteredTasks[i][3]);
    }
}