// Function to run when window is loaded.  Includes event handlers for clicking the Add Task Button #addTaskButton.

var init = function () {
  var addTaskButton = document.querySelector("#addTaskButton"); 
  var addTaskInput = document.querySelector("#newTask");

  // event handler targeting the parent node of the individual tasks on the to-do list
  var taskNameParent = document.querySelector("#taskListToDo"); 
  taskNameParent.addEventListener("click", moveCompletedTask, false);

  // event handlers for task input field entry and Add Task button clicking

  addTaskButton.addEventListener("click", addTask, false);
  addTaskInput.addEventListener("keypress", function(e) {
    if (e.which === 13) {
      addTask();
    } 
  }, false);

};

// Function that resets input field and add button to 'Add Task' mode.  Removes 'Add Date' event handlers and add 'Add Task' event handlers.


var resetInput = function() {
  var addTaskButton = document.querySelector("#addTaskButton"); 
  var addTaskInput = document.querySelector("#newTask");

  addTaskButton.removeEventListener("click", addTask);
  //dateInput.removeEventListener("keypress", function); STILL NEEDS TO BE IMPLEMENTED

  addTaskButton.setAttribute("value", "Add Task");
  addTaskInput.setAttribute("placeholder", "Enter new task here.");
  addTaskInput.value = "";

  addTaskButton.addEventListener("click", addTask, false);
  addTaskInput.addEventListener("keypress", function(e) {
    if (e.which === 13) {
      addTask();
    } 
  }, false);


}

// Function that adds button.  Takes button label and parent element as input parameters.

var addButton = function (label, parent) {
  var buttonToAdd = document.createElement("button");
  buttonToAdd.innerHTML = label;
  parent.appendChild(buttonToAdd);

};


// Function that adds target date onto already created tasks

var addDueDate = function (parentTask) {
  var inputButton = document.querySelector("#addTaskButton");
  var dateInput = document.querySelector("#newTask");
  var ol = document.querySelector("#taskListToDo");
  var dueDate;
  var ul = document.createElement("ul");

  

  dateInput.setAttribute("placeholder", "What is your target date for that task?");
  dateInput.value = "";
  inputButton.setAttribute("value", "Add Date");

  //Removes event handlers on button and input field which call addTask()
  inputButton.removeEventListener("click", addTask);
  //dateInput.removeEventListener("keypress", function); STILL NEEDS TO BE IMPLEMENTED

  inputButton.addEventListener("click", function() {
    dueDate = dateInput.value;
    if (dueDate === "") {
      alert("Please enter a date, otherwise you're just wasting time ^_^")
    }
    else {
      ul.innerHTML = "Complete by: " + dueDate;
      ol.lastChild.appendChild(ul);
    }
  }, false);
};


// Function that adds user data onto the Tasks To Do List #tasklistToDo

var addTask = function () {
  var taskInput = document.querySelector("#newTask");
  var taskName = taskInput.value;
  var li = document.createElement("li");
  var ol = document.querySelector("#taskListToDo");
  
  if (taskName === "") {
    alert("Please enter a task, otherwise you're just wasting time ^_^")
  }
  else {    
    li.innerHTML = taskName;
    ol.appendChild(li);
    addButton("Mark Done!", li);
    
    addDueDate(li);
  }
};

// Function that moves task from Tasks To Do List  => Tasks Completed List

var moveCompletedTask = function(e) {
  if (e.target !== e.currentTarget) {
        var completionTime = new Date();
        var completedTask = e.target.parentNode;
        var buttonCompleted = e.target;
        var ol = document.querySelector("#taskListComplete");
        var ul = completedTask.lastChild;
        completedTask.parentNode.removeChild(completedTask);
        buttonCompleted.innerHTML = "Task Done on " + completionTime + "!";
        buttonCompleted.className = "buttonCompleted";
        completedTask.removeChild(ul);
        ol.appendChild(completedTask);
        resetInput();

    }
    e.stopPropagation();
};


/*original jQuery keypress event handler, calls userEntry() if the enter key is pressed: 

$(document).ready(function() {
  $("#newTask").keypress(function(event) {
    if (event.which === 13) {
      userEntry();
    } 
    console.log( "Handler for .keypress() called." );
  });
}); 
*/








window.onload = init;