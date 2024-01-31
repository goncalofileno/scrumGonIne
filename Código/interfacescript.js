//Listener para quando todas as acções de quando a página carrega
window.onload = function () {
  let username = sessionStorage.getItem("username"); //Obtém o o valor com o id username do sessionStorage
  if (username) {
    document.getElementById("displayUsername").textContent = username; //Coloca o username no displayUsername se existir
  }
  document.getElementById("newTaskModal").style.display = "none"; //Esconde o modal de adicionar tarefas
  displayTasks(); //Chama a função displayTasks para mostrar as tarefas
};

let trashIcon = document.getElementById("trashIcon");
let addTaskButton = document.getElementById("addTaskButton");
let newTaskModal = document.getElementById("newTaskModal");
let cancelButtonAddTaskModal = document.getElementById("cancelTaskButton");
let ToDoTasks = JSON.parse(sessionStorage.getItem("ToDoTasks")) || [];
let DoingTasks = JSON.parse(sessionStorage.getItem("DoingTasks")) || [];
let DoneTasks = JSON.parse(sessionStorage.getItem("DoneTasks")) || [];
let todoSection = document.getElementById("todo");
let doingSection = document.getElementById("doing");
let doneSection = document.getElementById("done");
let yesButton = document.querySelector(
  "#deleteWarning .options .btn:first-child"
);
let noButton = document.querySelector(
  "#deleteWarning .options .btn:last-child"
);
let contextMenu = document.getElementById("contextMenu");
let deleteTaskOption = document.getElementById("deleteTask");
let editTaskOption = document.getElementById("editTask");
let taskDetailsModal = document.getElementById("taskDetailsModal");
let modalTaskTitle = document.getElementById("taskTitleinfo");
let modalTaskDescription = document.getElementById("taskDescriptioninfo");
let modalOkButton = document.getElementById("modalOkButton");
let botaoLogout = document.getElementById("logoutButton"); //Obtém o botão de logout

trashIcon.ondragover = function (event) {
  allowDrop(event);
  trashIcon.classList.add("highlightTrash");
  trashIcon.src = "trashOpen2.png";
};
trashIcon.ondragleave = function () {
  // Remove a classe quando a tarefa não está mais sendo arrastada sobre o ícone do lixo
  trashIcon.classList.remove("highlightTrash");
  trashIcon.src = "trash.png";
};

trashIcon.ondrop = function (event) {
  event.preventDefault(); // Prevent the default action
  let taskId = event.dataTransfer.getData("text/plain"); // Get the task's identifier

  // Store the task's identifier in a data attribute of the deleteWarning modal
  let deleteWarning = document.getElementById("deleteWarning");
  deleteWarning.setAttribute("data-task-id", taskId);

  // Show the deleteWarning modal
  deleteWarning.style.display = "block";
  document.body.classList.add('modal-open');

  displayTasks(); // Display the tasks
  trashIcon.src = "trash.png";
};


//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", function () {
  sessionStorage.clear(); //Limpa o sessionStorage
  window.location.href = "index.html"; //Redireciona para a página de login
});

addTaskButton.addEventListener("click", function () {
  // Change the display style of the newTaskModal to block
  newTaskModal.style.display = "block";
  document.body.classList.add('modal-open');
});

cancelButtonAddTaskModal.addEventListener("click", function () {
  // Change the display style of the newTaskModal to none
  newTaskModal.style.display = "none";
  document.body.classList.remove('modal-open');
}); //////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("click", function (event) {
  // If the event's target is the newTaskModal, change its display style to none
  if (event.target == newTaskModal) {
    newTaskModal.style.display = "none";
    document.body.classList.remove('modal-open');
  }

  if (contextMenu.style.display === "block") {
    contextMenu.style.display = "none";
  }

  if (event.target == taskDetailsModal) {
    taskDetailsModal.style.display = "none";
    document.body.classList.remove('modal-open');
  }
});

function generateUniqueID() {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (
    ToDoTasks.some((task) => task.identificador === id) ||
    DoingTasks.some((task) => task.identificador === id) ||
    DoneTasks.some((task) => task.identificador === id)
  );
  return id;
}

function displayTasks() {
  // Get the task sections
  let todoSection = document.getElementById("todo");
  let doingSection = document.getElementById("doing");
  let doneSection = document.getElementById("done");

  // Clear the sections
  todoSection.innerHTML = "";
  doingSection.innerHTML = "";
  doneSection.innerHTML = "";

  // Function to create task element
  function createTaskElement(task) {
    let taskElement = document.createElement("div");
    taskElement.textContent = task.titulo;
    taskElement.id = task.identificador;
    taskElement.draggable = true; // Make the task draggable
    taskElement.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    });

    // Add event listener for double click
    taskElement.addEventListener("dblclick", function () {
      // Set the task details in the modal
      modalTaskTitle.textContent = task.titulo;
      modalTaskDescription.textContent = task.descricao;

      // Show the modal
      taskDetailsModal.style.display = "block";
      document.body.classList.add('modal-open');
    });

    // Add event listener for context menu
    taskElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      // Position context menu at cursor location
      let contextMenu = document.getElementById("contextMenu");
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.style.left = `${e.pageX}px`;

      // Store task id in context menu
      contextMenu.setAttribute("data-task-id", task.identificador);

      // Find task in the appropriate list
      let taskToEdit =
        ToDoTasks.find((t) => t.identificador === task.identificador) ||
        DoingTasks.find((t) => t.identificador === task.identificador) ||
        DoneTasks.find((t) => t.identificador === task.identificador);

      console.log(taskToEdit);

      // Store task in sessionStorage
      sessionStorage.setItem("taskToEdit", JSON.stringify(taskToEdit));

      // Show context menu
      contextMenu.style.display = "block";
    });

    return taskElement;
  }

  // Add tasks to the ToDo section
  ToDoTasks.forEach((task) => {
    todoSection.appendChild(createTaskElement(task));
  });

  // Add tasks to the Doing section
  DoingTasks.forEach((task) => {
    doingSection.appendChild(createTaskElement(task));
  });

  // Add tasks to the Done section
  DoneTasks.forEach((task) => {
    doneSection.appendChild(createTaskElement(task));
  });
}

// Handle the dragover event
todoSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

doingSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

doneSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

// Handle the drop event
todoSection.addEventListener("drop", drop);
doingSection.addEventListener("drop", drop);
doneSection.addEventListener("drop", drop);

submitTaskButton.addEventListener("click", function () {
  // Get the task title and description from the input fields
  let titulo = document.getElementById("taskTitle").value;
  let descricao = document.getElementById("taskDescription").value;

  // Generate a unique ID for the task
  let identificador = generateUniqueID();

  // Create a new task object
  let task = {
    identificador: identificador,
    titulo: titulo,
    descricao: descricao,
  };

  // Add the new task object to the ToDoTasks array
  ToDoTasks.push(task);

  // Save the ToDoTasks array to session storage
  sessionStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));

  // Clear the input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";

  displayTasks();

  // Close the modal
  newTaskModal.style.display = "none";
  document.body.classList.remove('modal-open');
});

function allowDrop(event) {
  event.preventDefault(); // Prevent the default to allow dropping
}

// Function to handle drop
function drop(event) {
  event.preventDefault(); // Prevent the default action
  let taskId = event.dataTransfer.getData("text/plain"); // Get the task's identifier

  // Get the task element and the target section
  let taskElement = document.getElementById(taskId);
  let targetSection = event.target;

  // If the target is not a section, get the parent section
  if (!targetSection.classList.contains("taskArea")) {
    targetSection = targetSection.closest(".taskArea");
  }

  // If the task element and the target section exist, move the task to the section
  if (taskElement && targetSection) {
    targetSection.appendChild(taskElement);

    // Find the task in the tasks arrays and remove it
    let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
    let taskList = ToDoTasks;
    if (taskIndex === -1) {
      taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoingTasks;
      if (taskIndex === -1) {
        taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
        taskList = DoneTasks;
      }
    }
    let task = taskList.splice(taskIndex, 1)[0]; // Remove the task from its current list

    // Add the task to the new list
    if (targetSection.id === "todo") {
      ToDoTasks.push(task);
    } else if (targetSection.id === "doing") {
      DoingTasks.push(task);
    } else if (targetSection.id === "done") {
      DoneTasks.push(task);
    }

    // Save the tasks arrays to session storage
    sessionStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
    sessionStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
    sessionStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

    displayTasks(); // Display the tasks
  }
}
// Handle the click event on the "Yes" button
yesButton.addEventListener("click", function () {
  let deleteWarning = document.getElementById("deleteWarning");
  let taskId = deleteWarning.getAttribute("data-task-id");

  // Find and remove the task from its current list
  let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
  let taskList = ToDoTasks;
  if (taskIndex === -1) {
    taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
    taskList = DoingTasks;
    if (taskIndex === -1) {
      taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoneTasks;
    }
  }
  taskList.splice(taskIndex, 1); // Remove the task from its current list

  // Save the tasks arrays to session storage
  sessionStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
  sessionStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
  sessionStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

  displayTasks(); // Display the tasks

  // Hide the deleteWarning modal
  deleteWarning.style.display = "none";
  document.body.classList.remove('modal-open');
});

// Handle the click event on the "No" button
noButton.addEventListener("click", function () {
  // Hide the deleteWarning modal
  let deleteWarning = document.getElementById("deleteWarning");
  deleteWarning.style.display = "none";
  document.body.classList.remove('modal-open');
});

deleteTaskOption.addEventListener("click", () => {
  // Hide context menu
  let contextMenu = document.getElementById("contextMenu");
  contextMenu.style.display = "none";
  

  // Get task id from context menu
  let taskId = contextMenu.getAttribute("data-task-id");

  // Store task id in deleteWarning modal
  let deleteWarning = document.getElementById("deleteWarning");
  deleteWarning.setAttribute("data-task-id", taskId);

  // Show deleteWarning modal
  deleteWarning.style.display = "block";
  document.body.classList.add('modal-open');
});

editTaskOption.addEventListener("click", () => {
  // Hide context menu
  let contextMenu = document.getElementById("contextMenu");
  contextMenu.style.display = "none";

  // Redirect to editTaskPage.html
  window.location.href = "editTaskPage.html";
});

modalOkButton.addEventListener("click", function () {
  taskDetailsModal.style.display = "none";
  document.body.classList.remove('modal-open');
});
