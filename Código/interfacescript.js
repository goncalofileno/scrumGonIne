//Listener para quando todas as acções de quando a página carrega
window.onload = function () {
  //Obtém o username da sessionStorage
  const username = localStorage.getItem("username");
  //Vai buscar o elemento que mostra o username
  let labelUsername = document.getElementById("displayUsername");
  //Coloca o username no elemento
  labelUsername.textContent = username;

  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  //Chama a função para mostrar as tarefas
  displayTasks();
};

//Obtem os trash icon
const trashIcon = document.getElementById("trashIcon");
//Obtem o botão Add Task
const addTaskButton = document.getElementById("addTaskButton");
//Obtem a modal para adicionar uma nova tarefa
const newTaskModal = document.getElementById("newTaskModal");
//Obtem o botao para cancelar a adição de uma nova tarefa
const cancelButtonAddTaskModal = document.getElementById("cancelTaskButton");

//Cria as 3 listas de objectos para as tarefas
const ToDoTasks = JSON.parse(localStorage.getItem("ToDoTasks")) || [];
const DoingTasks = JSON.parse(localStorage.getItem("DoingTasks")) || [];
const DoneTasks = JSON.parse(localStorage.getItem("DoneTasks")) || [];

//Obtem as 3 secções para as tarefas serem colocadas
const todoSection = document.getElementById("todo");
const doingSection = document.getElementById("doing");
const doneSection = document.getElementById("done");

//Obtem o modal de aviso de delete
const deleteWarning = document.getElementById("deleteWarning");
//Obtem os 2 botões do avisos de delete
const yesButton = document.getElementById("yesButtonDelete");
const noButton = document.getElementById("noButtonDelete");

//Obtem o popup menu que aparece com o click direito
const contextMenu = document.getElementById("contextMenu");
//Obtem a opcao de deconste do popup menu
const deleteTaskOption = document.getElementById("deleteTask");
//Obtem a opcao de editar do popup menu
const editTaskOption = document.getElementById("editTask");

//Obtem a modal que mostra os detalhes da tarefa
const taskDetailsModal = document.getElementById("taskDetailsModal");
//Obtem o label para o titulo da tarefa
const modalTaskTitle = document.getElementById("taskTitleinfo");
//Obtem o label para a descrição da tarefa
const modalTaskDescription = document.getElementById("taskDescriptioninfo");
//Obtem o botão para fechar a modal de detalhes da tarefa
const modalOkButton = document.getElementById("modalOkButton");

//Obtem o warning modal
const warningModal = document.getElementById("warningModal");
//Obtem o botão de ok do warning modal
const okButton = document.getElementById("modalWarningOkButton");

//Obtem o titulo e descrição do modal de adicionar uma nova tarefa
const taskTitle = document.getElementById("taskTitle").value;
const taskDescription = document.getElementById("taskDescription").value;

//Obtem o botão de logout
const botaoLogout = document.getElementById("logoutButton");

//Obtem a div que mostra a data e hora
const dateTimeDisplay = document.getElementById("dateTimeDisplay");

//Permite que uma tarefa seja largada sobre as secções
todoSection.addEventListener("drop", drop);
doingSection.addEventListener("drop", drop);
doneSection.addEventListener("drop", drop);

//Listener para quando se clica na em qualquer sitio da página
window.addEventListener("click", function (event) {
  //Se o popup menu estiver aberto e se clicar fora do popup menu, o popup menu é fechado
  if (contextMenu.style.display === "block") {
    contextMenu.style.display = "none";
  }

});

//Função que determina o que acontece quando o cursor está sobre trashIcon
trashIcon.ondragover = function (event) {
  //Permite que uma tarefa seja largada sobre o ícone do lixo
  allowDrop(event);
  //Atribui um highliht ao icone do lixo aberto
  trashIcon.classList.add("highlightTrash");
  //Muda a imagem do icone do lixo para o icone do lixo aberto
  trashIcon.src = "resources/Icons/trashOpen.png";
};

//Função que determina o que acontece quando o cursor sai de cima do trashIcon
trashIcon.ondragleave = function () {
  //Remove o highlight do icone do lixo aberto
  trashIcon.classList.remove("highlightTrash");
  //Muda a imagem do icone do lixo para o icone do lixo fechado
  trashIcon.src = "resources/Icons/trash.png";
};

//Função que determina o que acontece quando uma tarefa é largada sobre o trashIcon
trashIcon.ondrop = function (event) {
  //Permite que uma tarefa seja largada sobre o ícone do lixo, evitando o comportamento padrão
  event.preventDefault();

  //Obtem o id da tarefa que foi largada sobre o trashIcon
  const taskId = event.dataTransfer.getData("text/plain");

  //Guarda o id da tarefa no atributo data-task-id do deleteWarning modal
  deleteWarning.setAttribute("data-task-id", taskId);

  //Mostra o deleteWarning modal
  deleteWarning.style.display = "block";
  //Escura o fundo da página
  document.body.classList.add("modal-open");

  //Muda a imagem do icone do lixo para o icone do lixo fechado
  trashIcon.src = "resources/Icons/trash.png";
};

//Listener para quando o botão de logout é clicado
botaoLogout.addEventListener("click", function () {
  //Redireciona para a página de login
  window.location.href = "index.html";
});

//Listener para quando o botão Add Task é clicado
addTaskButton.addEventListener("click", function () {
  //Limpas os campos de input da modal
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";

  //Mostra a modal
  newTaskModal.style.display = "block";
  //Escurece o fundo da página
  document.body.classList.add("modal-open");
});

//Listener para quando o botão de cancelar da modal de adicionar uma nova tarefa é clicado
cancelButtonAddTaskModal.addEventListener("click", function () {
  //Fecha a modal
  newTaskModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.body.classList.remove("modal-open");
});

//Previne o comportamento padrão do browser quando o cursor é arrastado sobre as secções
todoSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doingSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});
doneSection.addEventListener("dragover", function (event) {
  event.preventDefault();
});

//Listener para quando o botão de adicionar uma nova tarefa é clicado
submitTaskButton.addEventListener("click", function () {
  // Vai buscar os valores dos inputs do titulo, descrição e prioridade da tarefa e guarda-os nas variáveis titulo, descricao e priority
  const titulo = document.getElementById("taskTitle").value;
  const descricao = document.getElementById("taskDescription").value;
  const priority = document.getElementById("editTaskPriority").value;

  if (titulo === "" || descricao === "") {
    //Mostra o modal de aviso
    warningModal.style.display = "block";
    //Adiciona o escurecimento do fundo da página
    document.getElementById("modalOverlay2").style.display = "block";
  } else {
    //Gera um id único para a tarefa e guarda-o na variável identificador
    const identificador = generateUniqueID();

    //Cria um objecto com o identificador, o titulo e a descrição da tarefa
    const task = {
      identificador: identificador,
      titulo: titulo,
      descricao: descricao,
      prioridade: priority,
    };

    //Adiciona esse objecto à lista de tarefas ToDoTasks
    ToDoTasks.push(task);

    //Guarda a lista de tarefas ToDoTasks na localStorage
    localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));

    //Chama a função para mostrar as tarefas com a nova tarefa adicionada
    displayTasks();

    //Fecha a modal de nova tarefa e remove o escurecimento do fundo da página
    newTaskModal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

//Listener para quando o botão de "Yes" do deleteWarning modal é clicado
yesButton.addEventListener("click", function () {
  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do deleteWarning modal
  const taskId = deleteWarning.getAttribute("data-task-id");

  //Percorre as 3 listas de tarefas para encontrar o index da tarefa que foi largada e guarda a taskList onde a tarefa se encontra
  let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
  let taskList = ToDoTasks;
  //findIndex retorna -1 se não encontrar a tarefa na lista
  if (taskIndex === -1) {
    taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
    taskList = DoingTasks;
    if (taskIndex === -1) {
      taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoneTasks;
    }
  }
  //Remove a tarefa da lista onde se encontrava
  taskList.splice(taskIndex, 1); // Remove the task from its current list

  //Guarda as 3 listas de tarefas na localStorage
  localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
  localStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
  localStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

  //Chama a função para mostrar as tarefas
  displayTasks();

  //Esconde o deleteWarning modal e remove o escurecimento do fundo da página
  deleteWarning.style.display = "none";
  document.body.classList.remove("modal-open");
});

noButton.addEventListener("click", function () {
  //Esconde o deleteWarning modal e remove o escurecimento do fundo da página
  deleteWarning.style.display = "none";
  document.body.classList.remove("modal-open");
});

//Listener para quando o botão de "Delete" do popup menu é clicado
deleteTaskOption.addEventListener("click", () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";

  //Obtem o identificador da tarefa que foi guardado no atributo data-task-id do popup menu
  const taskId = contextMenu.getAttribute("data-task-id");

  //Guarda o identificador da tarefa no atributo data-task-id do deleteWarning modal
  deleteWarning.setAttribute("data-task-id", taskId);

  //Mostra o deleteWarning modal e escurece o fundo da página
  deleteWarning.style.display = "block";
  document.body.classList.add("modal-open");
});

//Listener para quando o botão de "Edit" do popup menu é clicado
editTaskOption.addEventListener("click", () => {
  //Esconde o popup menu
  contextMenu.style.display = "none";

  //Redireciona para a página de editar tarefa
  window.location.href = "editTaskPage.html";
});

//Listener para quando o botão de "Ok" do modal de detalhes da tarefa é clicado
modalOkButton.addEventListener("click", function () {
  //Esconde o modal de detalhes da tarefa e remove o escurecimento do fundo da página
  taskDetailsModal.style.display = "none";
  document.body.classList.remove("modal-open");
});

//Listener para quando o botão de "Ok" do modal de aviso é clicado
okButton.addEventListener("click", function () {
  //Esconde o modal de aviso e remove o escurecimento do fundo da página
  warningModal.style.display = "none";
  //Remove o escurecimento do fundo da página
  document.getElementById("modalOverlay2").style.display = "none";
});

//Função que permite que um elemento seja largado sobre outro elemento, prevenindo o comportamento padrão do browser
function allowDrop(event) {
  event.preventDefault();
}

//Função que define o que acontece quando uma tarefa é largada sobre um determinado elemento
function drop(event) {
  //Evita o comportamento padrão do browser
  event.preventDefault();

  //Obtem o identificador da tarefa que foi largada sobre o elemento e guarda-o na variável taskId
  const taskId = event.dataTransfer.getData("text/plain");

  //Obtem o elemento div da tarefa através do identificador da tarefa
  const taskElement = document.getElementById(taskId);

  //Obtem a secção onde a tarefa foi largada
  let targetSection = event.target;

  //Se a taskElement e a targetSection existirem
  if (taskElement && targetSection) {
    //Adiciona a tarefa à secção onde foi largada
    targetSection.appendChild(taskElement);

    //Percorre as 3 listas de tarefas para encontrar o index da tarefa que foi largada e guarda a taskList onde a tarefa se encontra
    let taskIndex = ToDoTasks.findIndex((task) => task.identificador == taskId);
    let taskList = ToDoTasks;
    //findIndex retorna -1 se não encontrar a tarefa na lista
    if (taskIndex === -1) {
      taskIndex = DoingTasks.findIndex((task) => task.identificador == taskId);
      taskList = DoingTasks;
      if (taskIndex === -1) {
        taskIndex = DoneTasks.findIndex((task) => task.identificador == taskId);
        taskList = DoneTasks;
      }
    }

    //Remove a tarefa da lista onde se encontrava
    const task = taskList.splice(taskIndex, 1)[0];

    //Através da secção onde a tarefa foi largada, adiciona a tarefa à lista correspondente
    if (targetSection.id === "todo") {
      ToDoTasks.push(task);
    } else if (targetSection.id === "doing") {
      DoingTasks.push(task);
    } else if (targetSection.id === "done") {
      DoneTasks.push(task);
    }

    //Guarda as 3 listas de tarefas na localStorage
    localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
    localStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
    localStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

    //Volta a chamar a função para mostrar as tarefas
    displayTasks();
  }
}

//Função que gera um id único para uma tarefa
function generateUniqueID() {
  let id;
  //Gera um id aleatório e verifica se esse id já existe nas 3 listas de tarefas
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (
    ToDoTasks.some((task) => task.identificador === id) ||
    DoingTasks.some((task) => task.identificador === id) ||
    DoneTasks.some((task) => task.identificador === id)
  );
  return id;
}

//Função que imprime as tarefas nas secções correspondentes
function displayTasks() {
  //Limpa todas as secções de tarefas
  todoSection.innerHTML = "";
  doingSection.innerHTML = "";
  doneSection.innerHTML = "";

  //Função que cria um elemento para uma tarefa na secção correspondente
  function createTaskElement(task) {
    //Cria um elemento div para a tarefa
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-element");

    //Cria um elemento div para o titulo da tarefa para que o mesmo possa ser estilizado
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title");
    titleContainer.textContent = task.titulo;
    taskElement.appendChild(titleContainer);
    //Atribui o id ao elemento div pelo identificador da tarefa
    taskElement.id = task.identificador;
    //Define que o elemento div é arrastável
    taskElement.draggable = true;

    //Cria um elemento img para o icon da prioridade
    const priorityIcon = document.createElement("img");
    priorityIcon.classList.add("priority-icon");

    //Define o icon da prioridade de acordo com a prioridade da tarefa
    switch (task.prioridade) {
      case "low":
        priorityIcon.src = "resources/Icons/low_priority.png";
        break;
      case "medium":
        priorityIcon.src = "resources/Icons/medium_priority.png";
        break;
      case "high":
        priorityIcon.src = "resources/Icons/high_priority.png";
        break;
      default:
        break;
    }

    //Adiciona o icon da prioridade ao elemento div
    taskElement.appendChild(priorityIcon);

    //Define que a informação do elemento arrastável é o id da tarefa
    taskElement.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/plain", event.target.id);
      trashIcon.classList.add("show");
    });

    //Define que o icon do lixo é escondido quando o elemento arrastável é largado
    taskElement.addEventListener("dragend", function (e) {
      trashIcon.classList.remove("show");
    });

    //Adiciona um listener para quando o elemento div é clicado duas vezes
    taskElement.addEventListener("dblclick", function () {
      //Coloca no modal os detalhes da tarefa o titulo e a descrição
      modalTaskTitle.textContent = task.titulo;
      modalTaskDescription.textContent = task.descricao;

      //Mostra o modal escurecendo o fundo da página
      taskDetailsModal.style.display = "block";
      document.body.classList.add("modal-open");
    });

    //Adiciona um listener para quando o elemento div é clicado com o botão direito
    taskElement.addEventListener("contextmenu", (e) => {
      //Previnir o comportamento padrão do browser
      e.preventDefault();

      //Estiliza o popup menu para aparecer onde o cursor é clicado com o botão direito
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.style.left = `${e.pageX}px`;

      //Guarda o identificador e a prioridade da tarefa
      contextMenu.setAttribute("data-task-id", task.identificador);

      //Variável para guardar o nome da secção onde a tarefa se encontra
      let sectionName;

      //Verifica onde se encontra a tarefa através do identificador da tarefa e guarda-a na variável taskToEdit
      const taskToEdit =
        ToDoTasks.find((t) => t.identificador === task.identificador) ||
        DoingTasks.find((t) => t.identificador === task.identificador) ||
        DoneTasks.find((t) => t.identificador === task.identificador);

      //Verifica onde se encontra a tarefa e guarda o nome da secção na variável sectionName
      if (ToDoTasks.includes(taskToEdit)) {
        sectionName = "ToDo";
      } else if (DoingTasks.includes(taskToEdit)) {
        sectionName = "Doing";
      } else if (DoneTasks.includes(taskToEdit)) {
        sectionName = "Done";
      }

      //Grava a tarefa e o nome da secção onde se encontra na sessionStorage
      sessionStorage.setItem("taskToEdit", JSON.stringify(taskToEdit));
      sessionStorage.setItem("sectionName", sectionName);

      //Mostra o popup menu
      contextMenu.style.display = "block";
    });
    //Retorna o elemento div
    return taskElement;
  }

  //Adiciona as tarefas à secção ToDo
  ToDoTasks.forEach((task) => {
    todoSection.appendChild(createTaskElement(task));
  });

  //Adiciona as tarefas à secção Doing
  DoingTasks.forEach((task) => {
    doingSection.appendChild(createTaskElement(task));
  });

  //Adiciona as tarefas à secção Done
  DoneTasks.forEach((task) => {
    doneSection.appendChild(createTaskElement(task));
  });
}

//Função que mostra a data e hora
function displayDateTime() {
  const currentDate = new Date();

  //Formata a data e hora
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const dateTimeString = currentDate.toLocaleDateString("en-US", options);

  // Atualiza o conteúdo do elemento
  dateTimeDisplay.textContent = dateTimeString;
}
