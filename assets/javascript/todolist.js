// Function to run when window is loaded.  On initial load, calls setTaskUI() to allow user to add tasks.

var init = function () {
  setTaskUI();
};

// Function that sets up input field and adding button for user to add new tasks.   

var setTaskUI = function() {
  var addTaskButton = document.querySelector("#addingButton"); 
  var taskInput = document.querySelector("#inputField");

  //Removes any existing event handlers on button and input field which call addDueDate()
  addTaskButton.removeEventListener("click", addDueDate);
  taskInput.removeEventListener("keypress", keypressListenerDate);
  //Removes any existing styling class from input field, returning to default visual style
  taskInput.classList.remove("dateInput");

  // Adds 'Add Task' visual attributes and values to input field and button.  

  addTaskButton.setAttribute("value", "Add Task");
  taskInput.setAttribute("placeholder", "Enter new task here.");
  taskInput.value = "";
  
  //Adds event listeners to Add Task button and input field
  
  addTaskButton.addEventListener("click", addTask, false);
  taskInput.addEventListener("keypress", keypressListenerTask, false);
}

// Function that adds user data onto the Tasks To Do List #tasklistToDo.  

var addTask = function () {
  var taskInput = document.querySelector("#inputField");
  var newTaskName = taskInput.value.toUpperCase(); 


  var taskListItem = document.createElement("li");
  var tasksOrderedListToDo = document.querySelector("#taskListToDo");
  
  if (newTaskName === "") {
    alert("Please enter a task, otherwise you're just wasting time ^_^")
  }
  else {    
    taskListItem.innerText = newTaskName;
    tasksOrderedListToDo.appendChild(taskListItem);
    //addButton("Mark Done!", "markdone", taskListItem);    
    setDateUI();
    
  }
};

//Function that calls another handler if enter key is pressed on input field during task input

var keypressListenerTask = function(e) {
  if (e.which === 13) {
    addTask();
  } 
};

// Function that adds button.  Takes button label and parent element as input parameters.  

var addButton = function (label, className, parent) {
  var buttonToAdd = document.createElement("button");
  buttonToAdd.innerText = label;
  buttonToAdd.className = className;
    
  parent.appendChild(buttonToAdd);
  //Adds event listener to button
  buttonToAdd.addEventListener("click", moveCompletedTask);
};



// Function that sets up input field and adding button for user to add new dates.

var setDateUI = function() {
  var addDateButton = document.querySelector("#addingButton");
  var dateInput = document.querySelector("#inputField");

  // Adds 'Add Date' visual attributes and values to input field and button.
  addDateButton.setAttribute("value", "Add Date");
  dateInput.setAttribute("placeholder", "Enter due date for that task here.");
  dateInput.value = "";

  //Add a class to input field for styling to alert user
  dateInput.className = "dateInput";  
  
  //Removes event handlers on button and input field which call addTask()
  addDateButton.removeEventListener("click", addTask);
  dateInput.removeEventListener("keypress", keypressListenerTask);

  //Adds event listeners to Add Date button and input field
  addDateButton.addEventListener("click", addDueDate, false);
  dateInput.addEventListener("keypress", keypressListenerDate, false);
};

// Function that adds target date onto already created tasks

var addDueDate = function () { 
  var tasksOrderedListToDo = document.querySelector("#taskListToDo");
  var completeByMsg = document.createElement("p");   
  var dateInput = document.querySelector("#inputField");
  var dueDate = dateInput.value; 
  var taskListItem = tasksOrderedListToDo.lastChild;
   

  if (dueDate === "") {
    alert("Please enter a date, otherwise you're just wasting time ^_^")
  }
  else {
    completeByMsg.innerText = "Complete by: " + dueDate;
    addButton("Mark Done!", "markdone", taskListItem);
    taskListItem.appendChild(completeByMsg);
  }
  setTaskUI();
};

//Function that calls another handler if enter key is pressed on input field during date input
var keypressListenerDate = function(e) {
  if (e.which === 13) {
    addDueDate();
  } 
};

//Function that returns date formatted as in example:  01 January 2015. Reference http://stackoverflow.com/questions/3552461/how-to-format-javascript-date, username mrzmyr

var formattedDate = function(date) {
  var day = date.getDate();
  var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
  ];
  var monthIndex = date.getMonth();
  
  completeDate = day + " " + monthNames[monthIndex];
  return completeDate;
};

// Function that moves task from Tasks To Do List  => Tasks Completed List

var moveCompletedTask = function(e) {
  console.log("moveCompletedTask called");
  //Sets date w/ JS Date object methods
  var currentDate = new Date();
  var completionTime = formattedDate(currentDate);
  var completedTask = e.target.parentNode;
  var button = e.target;
  var ol = document.querySelector("#taskListComplete");
  var ul = completedTask.lastChild;

  completedTask.parentNode.removeChild(completedTask);
  button.innerHTML = "Completed on " + completionTime + "!";
  button.className = "buttonCompleted";
  completedTask.removeChild(ul);
  ol.appendChild(completedTask);

  button.removeEventListener("click", moveCompletedTask, false);
  
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