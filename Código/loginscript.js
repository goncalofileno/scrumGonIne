//Ao clicar no botão de login, o username é armazenado na sessionStorage e o usuário é redirecionado para a página de interface
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    //Armazena o username na sessionStorage
    const user = document.getElementById("username").value;
    //Armazena o username na localStorage
    localStorage.setItem("username", user);
    //Redireciona para a página de interface
    window.location.href = "interface.html";
  });
