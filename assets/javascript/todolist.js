// Function to run when window is loaded.  Includes event handlers for clicking the Add Task Button #addTaskButton.
// Working to add event handler for clicking the Mark Done! button within the To-Do-List
var init = function () {
  var addTaskButton = document.getElementById("addTaskButton");  
  // event handler targeting the parent node of the individual tasks on the to-do list
  var taskNameParent = document.querySelector("#taskListToDo") 
  taskNameParent.addEventListener("click", taskComplete, false); 
  addTaskButton.onclick = userEntry;
};


// Function that adds user data onto the  To-Do-List #tasklistToDo
var userEntry = function () {
  var taskInput = document.getElementById("newTask");
  var taskName = taskInput.value;
  if (taskName === "") {
    alert("Please enter a task, otherwise you're just wasting time ^_^")
  }
  else {
    var li = document.createElement("li");
    var buttonMarkDone = document.createElement("button");
    var ol = document.getElementById("taskListToDo");
    li.innerHTML = taskName + " ";
    buttonMarkDone.innerHTML = "Mark Done!";
    ol.appendChild(li);
    li.appendChild(buttonMarkDone);
    
    taskInput.value = "";
  }
};


var taskComplete = function(e) {
  if (e.target !== e.currentTarget) {
        var completedTask = e.target.parentNode;
        console.log(completedTask); // debug
        var buttonCompleted = e.target;
        console.log(buttonCompleted); // debug
        var ol = document.getElementById("taskListComplete");
        completedTask.parentNode.removeChild(completedTask);
        //completedTask.parentNode.removeChild
        buttonCompleted.innerHTML = "Task Done!";
        buttonCompleted.className = "buttonCompleted";
        ol.appendChild(completedTask);

    }
    e.stopPropagation();
};


//jQuery keypress event handler, calls userEntry() if the enter key is pressed
$(document).ready(function() {
  $("#newTask").keypress(function(event) {
    if (event.which === 13) {
      userEntry();
    } 
    console.log( "Handler for .keypress() called." );
  });
}); 


window.onload = init;