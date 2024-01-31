window.onload = function () {
  // Get task from localStorage
  let task = JSON.parse(sessionStorage.getItem("taskToEdit"));
  confirmationModal.style.display = "none";
  // Populate fields
  document.getElementById("editarTarefaTitulo").value = task.titulo;
  document.getElementById("editarTarefaDescricao").value = task.descricao;

  document.getElementById("editTaskModal").style.display = "block";

  document.body.classList.add("modal-open");
};

let guardaEditarTarefaButton = document.getElementById("GuardaEditarTarefa");
let confirmEditButton = document.getElementById("confirmEditButton");
let cancelEditButton = document.getElementById("cancelEditButton");
let cancelaEditarTarefaButton = document.getElementById("CancelaEditarTarefa");
let modal = document.getElementById("editTaskModal");

cancelaEditarTarefaButton.addEventListener("click", function () {
  // Redirect to interface.html
  window.location.href = "interface.html";
});

guardaEditarTarefaButton.addEventListener("click", function () {
  // Show confirmation modal
  let editedTitulo = document.getElementById("editarTarefaTitulo").value;
  let editedDescricao = document.getElementById("editarTarefaDescricao").value;

  // Get original task details
  let task = JSON.parse(sessionStorage.getItem("taskToEdit"));
  let originalTitulo = task.titulo;
  let originalDescricao = task.descricao;

  // Check if changes have been made
  if (
    editedTitulo !== originalTitulo ||
    editedDescricao !== originalDescricao
  ) {
    // Show confirmation modal
    let confirmationModal = document.getElementById("confirmationModal");
    confirmationModal.style.display = "block";
    modal.style.display = "none";
  }
});

cancelEditButton.addEventListener("click", function () {
  // Hide confirmation modal
  let confirmationModal = document.getElementById("confirmationModal");
  confirmationModal.style.display = "none";
  modal.style.display = "block";
});

confirmEditButton.addEventListener("click", function () {
  // Get edited task details
  let editedTitulo = document.getElementById("editarTarefaTitulo").value;
  let editedDescricao = document.getElementById("editarTarefaDescricao").value;

  // Get the task that's being edited
  let taskToEdit = JSON.parse(sessionStorage.getItem("taskToEdit"));

  // Get the original task lists
  let ToDoTasks = JSON.parse(sessionStorage.getItem("ToDoTasks")) || [];
  let DoingTasks = JSON.parse(sessionStorage.getItem("DoingTasks")) || [];
  let DoneTasks = JSON.parse(sessionStorage.getItem("DoneTasks")) || [];

  // Define a helper function to update task in a list
  function updateTaskInList(taskList) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskToEdit.id) {
        taskList[i].titulo = editedTitulo;
        taskList[i].descricao = editedDescricao;
        return true;
      }
    }
    return false;
  }

  // Update task in the respective list
  if (!updateTaskInList(ToDoTasks)) {
    if (!updateTaskInList(DoingTasks)) {
      updateTaskInList(DoneTasks);
    }
  }

  // Save the updated task lists back to sessionStorage
  sessionStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
  sessionStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
  sessionStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

  // Redirect to interface.html
  window.location.href = "interface.html";
});
