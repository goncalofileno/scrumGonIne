//Listener para quando todas as acções de quando a página carrega
window.onload = function () {
  var username = sessionStorage.getItem("username");//Obtém o o valor com o id username do sessionStorage
  if (username) {
    document.getElementById("displayUsername").textContent = username;//Coloca o username no displayUsername se existir
  }
};
//Declaração de variáveis
var botaoLogout = document.getElementById("logoutButton");//Obtém o botão de logout

//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", function () {
  sessionStorage.clear(); //Limpa o sessionStorage
  window.location.href = "loginPage.html"; //Redireciona para a página de login
});

//SCRIPTS RELATIVOS AO DRAG AND DROP

//Permite que um item arrastado seja solto no elemento ao qual esta função está anexada
function allowDrop(ev) {
  ev.preventDefault();
}

//Define os dados que serão levados quando um objeto é arrastado
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

//função que é executada quando um item arrastado é largado
function drop(event) {

  event.preventDefault();//impede o comportamento padrão do navegador
  var data = event.dataTransfer.getData("text");//obtém os dados que foram definidos na função drag
  var target = event.target;//obtém o elemento onde o item arrastado foi largado

  //Verifica se o elemento onde o item foi largado é um dos elementos onde é possível largar
  while (
    target.id !== "todo" &&
    target.id !== "doing" &&
    target.id !== "done"
  ) {
    target = target.parentElement; //Se não for, vai buscar o elemento pai
    if (!target) {//Se não existir, não faz nada
      return;
    }
  }
  target.appendChild(document.getElementById(data));//Adiciona o item arrastado ao elemento onde foi largado
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SCRIPTS RELATIVOS AO MODAL DE ADICIONAR TAREFA

var modal = document.getElementById("newTaskModal");//Obtém o modal
var botaoAbreModal = document.getElementById("addTaskButton");//Obtém o botão que abre o modal
var botaoAddTarefa = document.getElementById("submitTaskButton");//Obtém o botão que adiciona a tarefa
var cancelBtn = document.getElementById("cancelTaskButton");//Obtém o botão que cancela a adição da tarefa

// Quando o usuário clica no botão, abre o modal
botaoAbreModal.onclick = function () {
  modal.style.display = "block";//Mostra o modal
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

//Listener para quando o botão de adicionar tarefa é clicado
botaoAddTarefa.onclick = function () {
  var taskTitle = document.getElementById("taskTitle").value;//Obtém o valor do input do título da tarefa
  var taskDescription = document.getElementById("taskDescription").value;//Obtém o valor do input da descrição da tarefa

  //Verifica se os campos estão vazios
  if (taskTitle.trim() === "" || taskDescription.trim() === "") {
    alert("Por favor, preencha o título e a descrição da tarefa.");
    return;
  }

  var newTask = document.createElement("div");//Cria um novo elemento div
  newTask.innerHTML = taskTitle;//Coloca o título da tarefa no elemento div
  newTask.id = "task" + Math.random().toString(36).substr(2, 9);//Cria um id aleatório, gera random float entre 0 e 1, converte para hexatredecimal e corta os primeiros 2 caracteres.
  newTask.title = taskTitle;//Coloca o título da tarefa no elemento div
  newTask.description = taskDescription;//Coloca a descrição da tarefa no elemento div  
  newTask.draggable = true;//Permite que o elemento seja arrastado


  //Adiciona as classes necessárias para o drag and drop
  newTask.ondragstart = function (event) {
    drag(event);
  };

  // Assume newTask is the newly created task element
  newTask.addEventListener('dblclick', function() {
  // Show the modal and populate the input fields
  editTaskTitle.value = this.title;
  editTaskDescription.value = this.description;
  editTaskModal.style.display = "block";
  });

  document.getElementById("todo").appendChild(newTask);//Adiciona a tarefa ao elemento todo

  //Limpa os campos do modal e fecha o modal
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get references to the modal and its elements
var editTaskModal = document.getElementById("editTaskModal");
var editTaskTitle = document.getElementById("editTaskTitle");
var editTaskDescription = document.getElementById("editTaskDescription");
var saveEditTaskButton = document.getElementById("saveEditTaskButton");
var cancelEditTaskButton = document.getElementById("cancelEditTaskButton");

/*
// Add a dblclick event listener to each task
document.querySelectorAll('.task').forEach(function(task) {
  task.addEventListener('dblclick', function() {
    // Show the modal and populate the input fields
    editTaskTitle.value = task.title;
    editTaskDescription.value = task.description;
    editTaskModal.style.display = "block";
  });
});
*/

var currentTask;
// Add a dblclick event listener to each task
document.querySelectorAll('.task').forEach(function(task) {
  task.addEventListener('dblclick', function() {
    // Store the currently edited task
    currentTask = this;

    // Show the modal and populate the input fields
    editTaskTitle.value = this.title;
    editTaskDescription.value = this.description;
    editTaskModal.style.display = "block";
  });
});

// Add a click event listener to the Save button
saveEditTaskButton.addEventListener('click', function() {
  // Update the title and description of the task
  currentTask.title = editTaskTitle.value;
  currentTask.description = editTaskDescription.value;

  // Hide the modal and clear the input fields
  editTaskTitle.value = "";
  editTaskDescription.value = "";
  editTaskModal.style.display = "none";
});

// Add a click event listener to the Cancel button
cancelEditTaskButton.addEventListener('click', function() {
  // Hide the modal and clear the input fields
  editTaskTitle.value = "";
  editTaskDescription.value = "";
  editTaskModal.style.display = "none";
});