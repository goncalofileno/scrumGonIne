window.onload = function () {
  // Retrieve the task id from the session storage
  var taskId = sessionStorage.getItem("editTaskId");

  // Retrieve the tasks array from the session storage
  var tasks = JSON.parse(sessionStorage.getItem("tasks"));

  // Find the task to be edited in the tasks array
  var task = tasks.find((task) => task.id === taskId);

  // Populate the form fields with the task details
  document.getElementById("editTaskTitle").value = task.title;
  document.getElementById("editTaskDescription").value = task.description;
};
