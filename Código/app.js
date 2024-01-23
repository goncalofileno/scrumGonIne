window.onload = function () {
  var username = localStorage.getItem("username");
  if (username) {
    document.getElementById("displayUsername").textContent = username;
  }
};

document.getElementById('loginForm').onsubmit = function(event) {
  event.preventDefault();
  
  var username = document.getElementById('username').value;
  if (!username.trim()) {
      alert('O campo de username não pode ser vazio ou conter apenas espaços!');
      return false;
  }

  localStorage.setItem("username", username);
  window.location.href = "interface.html";
};

  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    var task = event.target.cloneNode(true);
    event.dataTransfer.setData("text", task.outerHTML);
    event.target.style.opacity = "0.5"; // Reduz a opacidade da tarefa original durante o arrastar
  }
  
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var newTask = document.createElement("div");
    newTask.innerHTML = data;
    newTask.classList.add("task");
    event.target.appendChild(newTask);
  
    // Remover a tarefa da tabela original
    var originalTask = event.dataTransfer.getData("text");
    var originalTaskElement = document.querySelector("[draggable=true]:hover");
    originalTaskElement.style.opacity = "1"; // Restaura a opacidade da tarefa original
  
    if (originalTaskElement.parentElement !== event.target) {
      originalTaskElement.remove();
    }
  }

  function openAddTaskModal() {
    var modal = document.getElementById("addTaskModal");
    var overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
    document.body.appendChild(overlay);
    modal.style.display = "block";
    overlay.style.display = "block";
  }
  
  // Adicione a função para fechar a janela modal
  function closeAddTaskModal() {
    var modal = document.getElementById("addTaskModal");
    var overlay = document.querySelector(".modal-overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
  }
  
  // Adicione ação ao formulário da janela modal
  document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var taskTitle = document.getElementById('taskTitle').value;

    // Add the new task to the "To do" section
    var todoSection = document.getElementById('todoSection');
    var newTask = document.createElement('div');
    newTask.textContent = taskTitle;
    todoSection.appendChild(newTask);

    // Clear the input fields
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
});