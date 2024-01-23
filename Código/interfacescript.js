window.onload = function () {
  var username = sessionStorage.getItem("username");
  if (username) {
    document.getElementById("displayUsername").textContent = username;
  }
};

//Botão de logout
var logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {
  sessionStorage.clear(); //Limpa o sessionStorage

  window.location.href = "loginPage.html"; //Redireciona para a página de login
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target;
  while (
    target.id !== "todo" &&
    target.id !== "doing" &&
    target.id !== "done"
  ) {
    target = target.parentElement;
    if (!target) {
      return;
    }
  }
  target.appendChild(document.getElementById(data));
}

var modal = document.getElementById("newTaskModal");
var btn1 = document.getElementById("addTaskButton");
var btn = document.getElementById("submitTaskButton");
var span = document.getElementsByClassName("close")[0];
var cancelBtn = document.getElementById("cancelTaskButton");

btn1.onclick = function () {
  modal.style.display = "block";
};

btn.onclick = function () {
  var taskTitle = document.getElementById("taskTitle").value;
  var taskDescription = document.getElementById("taskDescription").value;


  if (taskTitle.trim() === "" || taskDescription.trim() === "") {
    alert("Por favor, preencha o título e a descrição da tarefa.");
    return;
  }

  var newTask = document.createElement("div");
  newTask.innerHTML = taskTitle;
  newTask.id = "task" + Math.random().toString(36).substr(2, 9); // Generate a random id
  newTask.draggable = true;
  newTask.ondragstart = function (event) {
    drag(event);
  };

  document.getElementById("todo").appendChild(newTask);

  // Clear the input fields and hide the modal
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
};

span.onclick = function () {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
};

cancelBtn.onclick = function () {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    modal.style.display = "none";
  }
};

var contextMenu = document.getElementById("contextMenu");
var selectedTask; // Variável para armazenar a tarefa selecionada

// Adiciona um ouvinte de eventos ao documento para fechar o menu de contexto ao clicar em qualquer lugar
document.addEventListener("click", function () {
  contextMenu.style.display = "none";
});

// Adiciona um ouvinte de eventos para o botão direito do mouse em cima de tarefas
document.addEventListener("contextmenu", function (event) {
  var clickedTask = event.target;
  if (clickedTask.classList.contains("task")) {
    event.preventDefault(); // Impede o menu de contexto padrão

    // Armazena a tarefa selecionada
    selectedTask = clickedTask;

    // Posiciona o menu de contexto nas coordenadas do clique
    contextMenu.style.left = event.pageX + "px";
    contextMenu.style.top = event.pageY + "px";

    // Exibe o menu de contexto
    contextMenu.style.display = "block";
  }
});

// Adiciona um ouvinte de eventos para o botão "Ver Detalhes" no menu de contexto
document.getElementById("viewDetails").addEventListener("click", function () {
  alert("Detalhes da tarefa: " + selectedTask.innerHTML);
  contextMenu.style.display = "none";
});

// Adiciona um ouvinte de eventos para o botão "Eliminar Task" no menu de contexto
document.getElementById("deleteTask").addEventListener("click", function () {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    selectedTask.remove();
  }
  contextMenu.style.display = "none";
});
