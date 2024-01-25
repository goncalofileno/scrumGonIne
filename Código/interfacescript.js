//Listener para quando todas as acções de quando a página carrega
window.onload = function () {
  let username = sessionStorage.getItem("username"); //Obtém o o valor com o id username do sessionStorage
  if (username) {
    document.getElementById("displayUsername").textContent = username; //Coloca o username no displayUsername se existir
  }
};

//Declaração de variáveis
let botaoLogout = document.getElementById("logoutButton"); //Obtém o botão de logout

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
  event.preventDefault(); //impede o comportamento padrão do navegador
  var data = event.dataTransfer.getData("text"); //obtém os dados que foram definidos na função drag
  var target = event.target; //obtém o elemento onde o item arrastado foi largado

  //Verifica se o elemento onde o item foi largado é um dos elementos onde é possível largar
  while (
    target.id !== "todo" &&
    target.id !== "doing" &&
    target.id !== "done"
  ) {
    target = target.parentElement; //Se não for, vai buscar o elemento pai
    if (!target) {
      //Se não existir, não faz nada
      return;
    }
  }
  target.appendChild(document.getElementById(data)); //Adiciona o item arrastado ao elemento onde foi largado
}
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

// Initialize tasks array from session storage, or as an empty array if session storage is empty
let tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];

//Listener para quando o botão de adicionar tarefa é clicado
botaoAddTarefa.onclick = function () {
  var taskTitle = document.getElementById("taskTitle").value;
  var taskDescription = document.getElementById("taskDescription").value;

  if (taskTitle.trim() === "" || taskDescription.trim() === "") {
    alert("Por favor, preencha o título e a descrição da tarefa.");
    return;
  }

  let taskId = Math.floor(Math.random() * 1000000);
  let taskSection = 'todo';

  // Create a new task object
  let task = {
    id: taskId,
    title: taskTitle,
    description: taskDescription,
    section: taskSection
  };

  // Add the new task object to the tasks array
  tasks.push(task);

  // Save the tasks array to session storage
  sessionStorage.setItem('tasks', JSON.stringify(tasks));







  //script that allows the task to be dragged to the trash icon and be deleted
  var trashIcon = document.getElementById("trashIcon");
  trashIcon.ondragover = function (event) {
    allowDrop(event);
  }
  trashIcon.ondrop = function (event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
  
    // Remove the task element
    var taskElement = document.getElementById(data);
    if (taskElement) {
      taskElement.parentNode.removeChild(taskElement);
    }
  }
  

  var editTaskModal = document.getElementById("editTaskModal");
  var editTaskTitle = document.getElementById("editTaskTitle");
  var editTaskDescription = document.getElementById("editTaskDescription");
  var saveEditTaskButton = document.getElementById("saveEditTaskButton");
  var cancelEditTaskButton = document.getElementById("cancelEditTaskButton");

  newTask.addEventListener("dblclick", function () {
    // Retrieve the task object from the newTask element's dataset
    var taskObject = JSON.parse(this.dataset.task);

    // Show the modal and populate the input fields
    editTaskTitle.value = taskObject.titulo;
    editTaskDescription.value = taskObject.descricao;
    editTaskModal.style.display = "block";

    var currentTask = this;

    saveEditTaskButton.addEventListener("click", function () {
      if (currentTask) {
        // Only proceed if there is a task being edited
        // Retrieve the task object from the currentTask element's dataset
        var taskObject = JSON.parse(currentTask.dataset.task);

        // Update the title and description of the task object
        taskObject.titulo = editTaskTitle.value;
        taskObject.descricao = editTaskDescription.value;

        // Update the currentTask element's dataset with the updated task object
        currentTask.dataset.task = JSON.stringify(taskObject);

        // Update the innerHTML of the currentTask element with the updated title
        currentTask.innerHTML = taskObject.titulo;

        // Hide the modal and clear the input fields
        editTaskTitle.value = "";
        editTaskDescription.value = "";
        editTaskModal.style.display = "none";
        currentTask = null;
      }
    });

    cancelEditTaskButton.addEventListener("click", function () {
      // Hide the modal and clear the input fields
      editTaskTitle.value = "";
      editTaskDescription.value = "";
      editTaskModal.style.display = "none";
    });
  });

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  modal.style.display = "none";
  document.getElementById("todo").appendChild(newTask);

  var contextMenu = document.getElementById("contextMenu");
  var deleteTask = document.getElementById("deleteTask");
  var editTask = document.getElementById("editTask");

  newTask.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevent the default context menu from showing

    // Position the context menu at the cursor position
    contextMenu.style.top = event.clientY + "px";
    contextMenu.style.left = event.clientX + "px";

    // Show the context menu
    contextMenu.style.display = "block";

    // Store the task that was right-clicked
    var currentTask = this;

    // Add a click event listener to the 'Delete Task' option
    deleteTask.addEventListener("click", function () {
      currentTask.remove(); // Remove the task
      contextMenu.style.display = "none"; // Hide the context menu
      // Remove the reference to the task
    });

    // Add a click event listener to the 'Edit Task' option
    editTask.addEventListener("click", function () {
      var editTaskModal = document.getElementById("editTaskModal");
      var editTaskTitle = document.getElementById("editTaskTitle");
      var editTaskDescription = document.getElementById("editTaskDescription");
      var saveEditTaskButton = document.getElementById("saveEditTaskButton");
      var cancelEditTaskButton = document.getElementById(
        "cancelEditTaskButton"
      );

      var taskObject = JSON.parse(currentTask.dataset.task); // Use currentTask instead of this

      // Show the modal and populate the input fields
      editTaskTitle.value = taskObject.titulo;
      editTaskDescription.value = taskObject.descricao;
      editTaskModal.style.display = "block";

      saveEditTaskButton.addEventListener("click", function () {
        if (currentTask) {
          // Only proceed if there is a task being edited
          // Retrieve the task object from the currentTask element's dataset
          var taskObject = JSON.parse(currentTask.dataset.task);

          // Update the title and description of the task object
          taskObject.titulo = editTaskTitle.value;
          taskObject.descricao = editTaskDescription.value;

          // Update the currentTask element's dataset with the updated task object
          currentTask.dataset.task = JSON.stringify(taskObject);

          // Update the innerHTML of the currentTask element with the updated title
          currentTask.innerHTML = taskObject.titulo;

          // Hide the modal and clear the input fields
          editTaskTitle.value = "";
          editTaskDescription.value = "";
          editTaskModal.style.display = "none";
          currentTask = null;
        }
      });

      cancelEditTaskButton.addEventListener("click", function () {
        // Hide the modal and clear the input fields
        editTaskTitle.value = "";
        editTaskDescription.value = "";
        editTaskModal.style.display = "none";
        currentTask = null;
      });
      contextMenu.style.display = "none";
    });

    // Hide the context menu when the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (
        event.target != contextMenu &&
        event.target.parentNode != contextMenu
      ) {
        contextMenu.style.display = "none";
      }
    });
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
