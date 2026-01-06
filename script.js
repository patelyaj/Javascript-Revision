
let container1 = document.querySelector('.container1');
let tasklist = document.querySelector('.task-list');

// task inputs
let taskdescription = document.querySelector('.task');
let taskdate = document.querySelector('.date');

container1.classList.add('hidden');

let todo = [];
// localStorage.setItem("mytask",[]);
let id = 1;
let currentid;

window.onload = () => {
    let actualformat = JSON.parse(localStorage.getItem("mytask"));
    console.log(actualformat);
    // console.log(typeof(actualformat));
    // console.log(actualformat.length);

    if (actualformat.length != 0) {
        for (let x in actualformat) {
            if (actualformat[x][0] > id) {
                id = actualformat[x][0];
            }
        }
        id++;
        for (let x in actualformat) {
            todo.push([actualformat[x][0], actualformat[x][1], actualformat[x][2], actualformat[x][3]]);
            displaytask(actualformat[x][0], actualformat[x][1], actualformat[x][2], actualformat[x][3]);
        }
    }

    // console.log(localStorage.getItem("mytask"));
}

let temp = []
// add task
function addatask() {
    let taskname = taskdescription.value;
    let taskdatevalue = taskdate.value;
    todo.push([id, taskname, taskdatevalue, false]);

    // temp.push([ id, taskname, taskdatevalue ]);
    // localStorage.setItem("mytask", todo);
    localStorage.setItem("mytask", JSON.stringify(todo));
    // localStorage.setItem(id , [taskname,taskdatevalue]);

    console.log(todo);
    displaytask(id, taskname, taskdatevalue, false);
    toggle()
    id++;

    // clearing the value
    taskdescription.value = "";
    taskdate.value = "";
    // task-list
}

// let taskedit = document.querySelector('.task-edit');
// taskedit.classList.add('hidden');

function toggleedit() {
    if (taskedit.hasAttribute('class', 'hidden')) {
        taskedit.classList.remove('hidden');
        taskedit.classList.add('visible');
    }
    else {
        taskedit.classList.remove('visible');
        taskedit.classList.add('hidden');
    }

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



function displaytask(id, taskname, taskdatevalue, status) {

    // for(let x in todo){
    // console.log(x);
    // console.log(todo[x].id);
    // console.log(todo[x].id[0]);
    // console.log(x.id[0]);
    // console.log(x.id[1]);
    //
    let newinnercontainer = document.createElement('div');
    let taskspan = document.createElement('span');
    let editbutton = document.createElement('button');
    let deletebutton = document.createElement('button');
    let markascompleted = document.createElement('button');

    newinnercontainer.classList.add('innercontainer');
    tasklist.appendChild(newinnercontainer);

    taskspan.classList.add('taskspan');
    taskspan.innerHTML = taskname;


    // edit button
    editbutton.classList.add('editbtn');
    editbutton.addEventListener("click", () => {
        let inp1 = document.createElement('input');
        inp1.value = taskname;
        inp1.style.width = '3rem';
        let inp2 = document.createElement('input');
        inp2.type = 'datetime-local';
        inp2.style.width = '3rem';
        inp2.value = taskdatevalue;
        let savebtn = document.createElement('button');
        savebtn.innerText = "Save";

        newinnercontainer.replaceChild(savebtn, editbutton);
        newinnercontainer.replaceChild(inp2, taskspan);
        newinnercontainer.prepend(inp1);

        savebtn.addEventListener("click", () => {
            for (let x in todo) {
                if (todo[x][0] == id) {
                    todo[x][1] = inp1.value;
                    todo[x][2] = inp2.value;
                }
            }
            localStorage.setItem("mytask", JSON.stringify(todo));
            console.log(todo);

            displaytaskagain();
        });
    });
    editbutton.setAttribute('id', id);
    editbutton.innerHTML = "edit"

    // delete button
    deletebutton.classList.add('deletebtn');
    deletebutton.setAttribute('id', id);
    deletebutton.addEventListener("click", () => { calldelete(id) });
    deletebutton.innerHTML = "delete";

    // mark as completed
    markascompleted.classList.add('completedbtn');
    markascompleted.setAttribute('id', id);

    // appending childs
    newinnercontainer.appendChild(taskspan);
    

    newinnercontainer.appendChild(deletebutton);

    if (status == false) {
        // default whilte 
        newinnercontainer.appendChild(editbutton);  
        newinnercontainer.appendChild(markascompleted);
        markascompleted.innerHTML = "mark as completed"
        markascompleted.addEventListener("click", () => { callmarkascompleted(id) });
    }
    else {
        newinnercontainer.style.backgroundColor = "lightgreen";
        newinnercontainer.appendChild(markascompleted);
        markascompleted.innerHTML = "undo";
        markascompleted.addEventListener("click", () => { callundo(id) });
    }
    // }
}
let z = document.querySelector('.taskedit');
let y = document.querySelector('.dateedit');


// function putvalue(id, taskname, taskdatevalue) {
//     currentid = id;
//     z.value = taskname;
//     // y.innerHTML = taskdatevalue;
//     y.value = taskdatevalue;
// }

// function edittask() {
// for (let x in todo) {
//     if (todo[x][0] == currentid) {
//         todo[x][1] = z.value;
//         todo[x][2] = y.value;
//     }
// }
// localStorage.setItem("mytask", JSON.stringify(todo));
// console.log(todo);

// displaytaskagain();
// }

function displaytaskagain() {
    tasklist.innerHTML = "";
    for (let x in todo) {
        displaytask(todo[x][0], todo[x][1], todo[x][2], todo[x][3]);
    }
}

function calldelete(id) {
    tasklist.innerHTML = "";
    // let temp = [];
    // for (let x in todo) {
    //     if(todo[x][0] != id){
    //         displaytask(todo[x][0], todo[x][1], todo[x][2]);
    //     }
    // }

    todo = todo.filter(tid => tid[0] != id);

    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displaytaskagain();
}

function callmarkascompleted(id) {
    for (let x in todo) {
        if (todo[x][0] == id) {
            todo[x][3] = true;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displaytaskagain();
}

function callundo(id) {
    for (let x in todo) {
        if (todo[x][0] == id) {
            todo[x][3] = false;
        }
    }
    localStorage.setItem("mytask", JSON.stringify(todo));
    console.log(todo);

    displaytaskagain();
}

function sortbydate() {
    todo.sort((a, b) => {
        return new Date(a[2]) - new Date(b[2]);
    });

    localStorage.setItem("mytask", JSON.stringify(todo));
    displaytaskagain();
}

function sortbyname() {
    todo.sort((a, b) => {
        return a[1].localeCompare(b[1]);
    });

    localStorage.setItem("mytask", JSON.stringify(todo));
    displaytaskagain();
}

function callsearch() {
    let searchtext = document.querySelector('.searchbox').value;
    console.log(searchtext);
    let z = todo.filter((x)=>{
        return x[1].toLowerCase().includes(searchtext.toLowerCase());
    })
    console.log(z);
    tasklist.innerHTML = "";
    for(let i in z){
        console.log(z[i][0]);
        console.log(z[i][1]);
        displaytask(z[i][0],z[i][1],z[i][2],z[i][3]);
    }
}