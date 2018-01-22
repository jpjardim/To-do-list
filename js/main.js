//Add event listener to form to prevent form submition and call the function addTask instead
document.getElementById('myForm').addEventListener('submit', addTask);

//Add task to local storage
function addTask(e) {
    //get the input value
    var taskName = document.getElementById('task').value;

    //create a JSON type object to hold the data
    var taskItem = {
        name: taskName,
        completed: false
    }

    //check if the local storage is empty
    if (localStorage.getItem('tasks') === null) {
        //if empty, init an array
        var taskList = [];
        //push the JSON object to it
        taskList.push(taskItem);
        //local storage only takes key values of type string, so we must parse the JSON object to a string, and then push the result to the local storage
        localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
        //if local storage is not empty, fetch the list from the local storage, parse it into a json object
        var taskList = JSON.parse(localStorage.getItem('tasks'));
        //push the task into the array of JSON objects
        taskList.push(taskItem);
        //save the array back to the local storage
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    //clear the form
    document.getElementById('myForm').reset();
    //render the body again
    renderTasks();
    //prevent submit from happening
    e.preventDefault();
}

//renders all the tasks to the body of the page
function renderTasks() {
    //get the div ID where the tasks will be rendered
    var content = document.getElementById('taskList');
    //get the div ID where the message will be rendered
    var message = document.getElementById('message');
    //fetch all the items from the local storage and parse them to JSON
    var taskList = JSON.parse(localStorage.getItem('tasks'));
    //clear the content of the page everytime the renderTasks method is called
    content.innerHTML = '';
    //clear the content of the page everytime the renderTasks method is called
    message.innerHTML = '';
    //display message if there are no tasks yet
    if (taskList.length === 0) {
        message.innerHTML = '<div class="row">' +
                            '<h6 class="header col s12 red-text">There are no tasks on your list yet...</h6>' +
                            '</div>'
    }else {
        //iterate through the results
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].completed === false) {
                //display every task to the page and add two buttons to each task, one for deleting and one for completing the task
                content.innerHTML +="<div class='row'>" +
                                    "<div class='col s12 m6'>" +
                                    "<div class='card'>" +
                                    "<div class='card-content'>" +
                                    "<span class='card-title'>Task "+(i+1)+"</span>" +
                                    "<a class='btn-floating halfway-fab waves-effect waves-light red' onClick='deleteTask(\"" + taskList[i].name + "\")'><i class='material-icons'>delete</i></a>" +
                                    "<p>"+ taskList[i].name +"</p>" +
                                    " </div>" +
                                    "<div class='card-action'>" +
                                    "<a onClick='completeTask(\"" + taskList[i].name + "\")'>Complete the task!</a>" +                               
                                    "</div></div></div></div>"

            }else {
                //display every task to the page and add two buttons to each task, one for deleting and one for completing the task
                content.innerHTML += "<div class='row'>" +
                                    "<div class='col s12 m6'>" +
                                    "<div class='card'>" +
                                    "<div class='card-content'>" +
                                    "<span class='card-title'>Task "+(i+1)+" <i class='small material-icons'>check</i></span>" +
                                    "<a class='btn-floating halfway-fab waves-effect waves-light red' onClick='deleteTask(\"" + taskList[i].name + "\")'><i class='material-icons'>delete</i></a>" +
                                    "<p>"+ taskList[i].name +"</p>" +
                                    " </div>" +
                                    "<div class='card-action'>" +
                                    "<span class='green-text text-darken-2'>COMPLETED</span>" +
                                    "</div></div></div></div>"
            }
        }
    }
    
}

//delete a task
function deleteTask(taskName) {
    //fetch all the items from the local storage and parse them to JSON
    var taskList = JSON.parse(localStorage.getItem("tasks"));
    //iterate through the results
    for (var j = 0; j < taskList.length; j++) {
        //if the task is in the position j of the array
        if (taskList[j].name === taskName) {
            //delete one object from the array at position j
            taskList.splice(j, 1);
        }
    }
    //set the array back to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));
    //render the body again
    renderTasks();
}

function completeTask(taskName) {
    //fetch all the items from the local storage and parse them to JSON
    var taskList = JSON.parse(localStorage.getItem("tasks"));
    //iterate through the results
    for (var j = 0; j < taskList.length; j++) {
        //if the task is in the position j of the array
        if (taskList[j].name === taskName) {
            taskList[j].completed = true;
        }
    }
     //set the array back to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));
    //render the body again
    renderTasks();
    
}
