//Função chamada cada vez que a página é carregada
window.onload = function () {
  let username = sessionStorage.getItem('username'); // Replace this with the actual method of retrieving the username
  if (username) {
    document.getElementById('displayUsername').textContent = username;
  }
  //Obtém a tarefa a ser editada da sessionStorage
  let task = JSON.parse(sessionStorage.getItem("taskToEdit"));
  //Preenche os campos do formulário com os detalhes da tarefa a editar
  document.getElementById("editarTarefaTitulo").value = task.titulo;
  document.getElementById("editarTarefaDescricao").value = task.descricao;
  document.getElementById("editTaskPriority").value = task.prioridade;
  document.getElementById("editTaskStatus").value =
    sessionStorage.getItem("sectionName");
  //Mostra o modal de edição e escurece o fundo
  document.getElementById("editTaskModal").style.display = "block";
  document.body.classList.add("modal-open");

  displayDateTime(); // Adiciona a exibição da data e hora
  setInterval(displayDateTime, 1000); // Atualiza a cada segundo
  //Esconde o modal de confirmação
  confirmationModal.style.display = "none";
};

//DECLARAÇÃO DE VARIÁVEIS
//Obtem o botão de guardar a edição da tarefa
let guardaEditarTarefaButton = document.getElementById("GuardaEditarTarefa");
//Obtem o botão de confirmar a edição da tarefa
let confirmEditButton = document.getElementById("confirmEditButton");
//Obtem o botão de cancelar a edição da tarefa do modal de confirmação
let cancelEditButton = document.getElementById("cancelEditButton");
//Obtem o botão de cancelar a edição da tarefa
let cancelaEditarTarefaButton = document.getElementById("CancelaEditarTarefa");
//Obtem o modal de edição da tarefa
let modal = document.getElementById("editTaskModal");
//Obtem o modal de confirmação
let confirmationModal = document.getElementById("confirmationModal");
//Obtem a tarefa a ser editada da sessionStorage
let taskToEdit = JSON.parse(sessionStorage.getItem("taskToEdit"));
//Guarda os valores originais dos campos que podem ser editados
let originalTitulo = taskToEdit.titulo;
let originalDescricao = taskToEdit.descricao;
let originalPriority = taskToEdit.prioridade;
let originalSectionName = sessionStorage.getItem("sectionName");
//Obtem as listas de tarefas da localStorage
let ToDoTasks = JSON.parse(localStorage.getItem("ToDoTasks")) || [];
let DoingTasks = JSON.parse(localStorage.getItem("DoingTasks")) || [];
let DoneTasks = JSON.parse(localStorage.getItem("DoneTasks")) || [];

//Obtem a div que mostra a data e hora
let dateTimeDisplay = document.getElementById("dateTimeDisplay");

//LISTENERS
//Adiciona um listener para o botão de cancelar a edição da tarefa
cancelaEditarTarefaButton.addEventListener("click", function () {
  // Redireciona para interface.html
  window.location.href = "interface.html";
});

//Adiciona um listener para o botão de cancelar a edição da tarefa do modal de confirmação
cancelEditButton.addEventListener("click", function () {
  //Esconde o modal de confirmação e mostra o modal de edição
  confirmationModal.style.display = "none";
  modal.style.display = "block";
});

//Adiciona um listener para o botão de guardar a edição da tarefa
guardaEditarTarefaButton.addEventListener("click", function () {
  
  //Obtem os valores dos campos que podem ser editados
  let editedTitulo = document.getElementById("editarTarefaTitulo").value;
  let editedDescricao = document.getElementById("editarTarefaDescricao").value;
  let selectedSectionName = document.getElementById("editTaskStatus").value;
  let selectedPriority = document.getElementById("editTaskPriority").value;

  //Verifica se algum dos campos foi alterado  
  if (
    editedTitulo !== originalTitulo ||
    editedDescricao !== originalDescricao ||
    selectedSectionName !== originalSectionName ||
    selectedPriority !== originalPriority
  ) {
    //Se algum dos campos foi alterado, mostra o modal de confirmação e escurece o fundo
    let confirmationModal = document.getElementById("confirmationModal");
    confirmationModal.style.display = "block";
    modal.style.display = "none";
  }
});

confirmEditButton.addEventListener("click", function () {
  //Obtem os valores dos campos que podem ser editados
  let editedTitulo = document.getElementById("editarTarefaTitulo").value;
  let editedDescricao = document.getElementById("editarTarefaDescricao").value;
  let selectedPriority = document.getElementById("editTaskPriority").value;
  let selectedSectionName = document.getElementById("editTaskStatus").value;

  //Atualiza os valores da tarefa a ser editada
  taskToEdit.titulo = editedTitulo;
  taskToEdit.descricao = editedDescricao;
  taskToEdit.prioridade = selectedPriority;

  //Remove a tarefa da secção original
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
  //Adiciona a tarefa à secção selecionada
  if (selectedSectionName === "ToDo") {
    ToDoTasks.push(taskToEdit);
  } else if (selectedSectionName === "Doing") {
    DoingTasks.push(taskToEdit);
  } else if (selectedSectionName === "Done") {
    DoneTasks.push(taskToEdit);
  }

  //Atualiza as listas de tarefas na localStorage com as edições feitas
  localStorage.setItem("ToDoTasks", JSON.stringify(ToDoTasks));
  localStorage.setItem("DoingTasks", JSON.stringify(DoingTasks));
  localStorage.setItem("DoneTasks", JSON.stringify(DoneTasks));

  //Redireciona para interface.html
  window.location.href = "interface.html";
});
// Função para exibir a data e hora atuais
function displayDateTime() {
  let currentDate = new Date();

  // Formata a data e hora como string (você pode ajustar o formato conforme necessário)
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  let dateTimeString = currentDate.toLocaleDateString("en-US", options);

  // Atualiza o conteúdo do elemento
  dateTimeDisplay.textContent = dateTimeString;
}


