var init = function () {
  var addTaskButton = document.getElementById("addTaskButton");
  var toDoList = document.querySelector("#toDoList") // need way to GET the ID of individual completeTaskButtons
  // Work on this event listener
  // toDoList.addEventListener("click", taskComplete, false); 
  addTaskButton.onclick = userEntry;
};

var userEntry = function () {
  var taskInput = document.getElementById("newTask");
  var taskName = taskInput.value;
  if (taskName === "") {
    alert("Please enter a task, otherwise you're just wasting time ^_^")
  }
  else {
    var li = document.createElement("li");
    var buttonComplete = document.createElement("button");
    var ol = document.getElementById("taskListToDo");
    li.innerHTML = taskName + " ";
    li.id = "newListItem";    
    buttonComplete.id = "completeTaskButton_" + taskName;
    buttonComplete.innerHTML = "Mark Done!";
    //ol.id = "toDoList";
    ol.appendChild(li);
    li.appendChild(buttonComplete);
    
    taskInput.value = "";
  }
};

/*
var taskComplete = function(e) {
  if
}
*/


$(document).ready(function() {
  $("#newTask").keypress(function(event) {
    if (event.which === 13) {
      userEntry();
    } 
    console.log( "Handler for .keypress() called." );
  });
}); 


window.onload = init;