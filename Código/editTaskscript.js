window.onload = function () {
  // Get task from localStorage
  let task = JSON.parse(sessionStorage.getItem("taskToEdit"));
  let sectionName = sessionStorage.getItem("sectionName");
  let priority = task.prioridade;
  

  // Get the select element 
  let selectElement = document.getElementById("editTaskStatus");
  let selectElementPriority = document.getElementById("editTaskPriority");

  // Set the value of the select element to the section name
  selectElement.value = sectionName;
  selectElementPriority.value = priority;
  

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
  let selectedSectionName = document.getElementById("editTaskStatus").value;
  let selectedPriority = document.getElementById("editTaskPriority").value;

  // Get original task details
  let task = JSON.parse(sessionStorage.getItem("taskToEdit"));
  let originalTitulo = task.titulo;
  let originalDescricao = task.descricao;
  let originalPriority = task.prioridade;
  let originalSectionName = sessionStorage.getItem("sectionName");

  // Check if changes have been made
  if (
    editedTitulo !== originalTitulo ||
    editedDescricao !== originalDescricao ||
    selectedSectionName !== originalSectionName ||
    selectedPriority !== originalPriority
  ) {
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
  let editedTitulo = document.getElementById("editarTarefaTitulo").value;
  let editedDescricao = document.getElementById("editarTarefaDescricao").value;
  let selectedPriority = document.getElementById("editTaskPriority").value;
  let selectedSectionName = document.getElementById("editTaskStatus").value;

  // Get the task that's being edited
  let taskToEdit = JSON.parse(sessionStorage.getItem("taskToEdit"));
  let originalSectionName = sessionStorage.getItem("sectionName");
  let originalPriority = taskToEdit.prioridade;

  // Check if any task details have been changed
  if (
    taskToEdit.titulo !== editedTitulo ||
    taskToEdit.descricao !== editedDescricao ||
    originalSectionName !== selectedSectionName ||
    originalPriority !== selectedPriority
  ) {
    // Update task details
    taskToEdit.titulo = editedTitulo;
    taskToEdit.descricao = editedDescricao;
    taskToEdit.prioridade = selectedPriority;

    // Get the task lists
    let ToDoTasks = JSON.parse(localStorage.getItem("ToDoTasks")) || [];
    let DoingTasks = JSON.parse(localStorage.getItem("DoingTasks")) || [];
    let DoneTasks = JSON.parse(localStorage.getItem("DoneTasks")) || [];

    // Remove the task from the original section
    if (originalSectionName === "ToDo") {
      ToDoTasks = ToDoTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    } else if (originalSectionName === "Doing") {
      DoingTasks = DoingTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    } else if (originalSectionName === "Done") {
      DoneTasks = DoneTasks.filter(
        (t) => t.identificador !== taskToEdit.identificador
      );
    }

    // Add the updated task to the selected section
    if (selectedSectionName === "ToDo") {
      ToDoTasks.push(taskToEdit);
    } else if (selectedSectionName === "Doing") {
      DoingTasks.push(taskToEdit);
    } else if (selectedSectionName === "Done") {
      DoneTasks.push(taskToEdit);
    }

    // Save the updated task lists back to sessionStorage
    localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
    localStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
    localStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));
  }

  // Redirect to interface.html
  window.location.href = "interface.html";
  

});
