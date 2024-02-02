//Ao clicar no botão de login, o username é armazenado na sessionStorage e o usuário é redirecionado para a página de interface
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    //Armazena o username na sessionStorage
    let user = document.getElementById("username").value;
    sessionStorage.setItem("username", user);
    //Redireciona para a página de interface
    window.location.href = "interface.html";
  });
