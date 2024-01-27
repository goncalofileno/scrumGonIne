//Listener para quando todas as acções de quando a página carrega
window.onload = function () {
  let username = sessionStorage.getItem("username"); //Obtém o o valor com o id username do sessionStorage
  if (username) {
    document.getElementById("displayUsername").textContent = username; //Coloca o username no displayUsername se existir
  }
};

var trashIcon = document.getElementById("trashIcon");

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
  event.preventDefault();
  var data = event.dataTransfer.getData("text");

  // Remove the task element
  var taskElement = document.getElementById(data);
  if (taskElement) {
    taskElement.parentNode.removeChild(taskElement);
  }
  trashIcon.src = "trash.png";
};
//Declaração de variáveis
let botaoLogout = document.getElementById("logoutButton"); //Obtém o botão de logout

//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", function () {
  sessionStorage.clear(); //Limpa o sessionStorage
  window.location.href = "loginPage.html"; //Redireciona para a página de login
});

//SCRIPTS RELATIVOS AO DRAG AND DROP

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SCRIPTS RELATIVOS AO MODAL DE ADICIONAR TAREFA

let modal = document.getElementById("newTaskModal"); //Obtém o modal
let botaoAbreModal = document.getElementById("addTaskButton"); //Obtém o botão que abre o modal
let botaoAddTarefa = document.getElementById("submitTaskButton"); //Obtém o botão que adiciona a tarefa
let cancelBtn = document.getElementById("cancelTaskButton"); //Obtém o botão que cancela a adição da tarefa

// Quando o usuário clica no botão, abre o modal
botaoAbreModal.onclick = function () {
  modal.style.display = "block"; //Mostra o modal
};

// Quando o usuário clica no botão, cancela a adição da tarefa
cancelBtn.onclick = function () {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
};

// Quando o usuário clica em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    modal.style.display = "none";
  }
};

//Inicias as listas de tarefas
let tasksToDo = JSON.parse(sessionStorage.getItem("tasks")) || [];
let tasksDoing = JSON.parse(sessionStorage.getItem("tasks")) || [];
let tasksDone = JSON.parse(sessionStorage.getItem("tasks")) || [];

//Função que gera um id único para cada tarefa
function generateUniqueId() {
  let identificador;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (tasks.find((task) => task.identificador === identificador));
  return identificador;
}

function displayTasks() {
  // Clear the existing tasks
  document.getElementById("tasksToDo").innerHTML = "";
  document.getElementById("tasksDoing").innerHTML = "";
  document.getElementById("tasksDone").innerHTML = "";

  // Function to create a task element
  function createTaskElement(task) {
    var taskElement = document.createElement("div");
    taskElement.id = task.identificador;
    taskElement.textContent = task.titulo;
    taskElement.draggable = true;
    taskElement.ondragstart = function (event) {
      event.dataTransfer.setData("text", task.identificador);
    };
    return taskElement;
  }

  // Iterate over the tasksToDo array
  tasksToDo.forEach(function (task) {
    var taskElement = createTaskElement(task);
    document.getElementById("tasksToDo").appendChild(taskElement);
  });

  // Iterate over the tasksDoing array
  tasksDoing.forEach(function (task) {
    var taskElement = createTaskElement(task);
    document.getElementById("tasksDoing").appendChild(taskElement);
  });

  // Iterate over the tasksDone array
  tasksDone.forEach(function (task) {
    var taskElement = createTaskElement(task);
    document.getElementById("tasksDone").appendChild(taskElement);
  });
}

//Listener para quando o botão de adicionar tarefa é clicado
botaoAddTarefa.onclick = function () {
  var taskTitle = document.getElementById("taskTitle").value;
  var taskDescription = document.getElementById("taskDescription").value;

  if (taskTitle.trim() === "" || taskDescription.trim() === "") {
    alert("Por favor, preencha o título e a descrição da tarefa.");
    return;
  } else {
    let taskIdentificador = generateUniqueId();

    // Create a new task object
    let task = {
      identificador: taskIdentificador,
      titulo: taskTitle,
      descricao: taskDescription,
    };

    // Add the new task object to the tasks array
    tasksToDo.push(task);

    // Save the tasks array to session storage
    sessionStorage.setItem("tasks", JSON.stringify(tasksToDo));

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    modal.style.display = "none";
    displayTasks();
  }
};
