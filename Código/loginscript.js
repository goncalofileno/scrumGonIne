  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
  
      var user = document.getElementById("username").value;
      sessionStorage.setItem("username", user);
  
      window.location.href = "interface.html";
    });