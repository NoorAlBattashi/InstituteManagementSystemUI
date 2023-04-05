const form = document.querySelector("form");
const usernameInput = document.querySelector('input[name = "username"]');
const passwordInput = document.querySelector('input[name="password"]');
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async  function(event){
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if(username === "" || password === ""){
        alert("Please enter username and password.")
        return;
    }

    const auth = btoa(`${username}:${password}`);
    try {
      const response = await fetch("http://localhost:8080/api/teacher", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Basic ${auth}`,
        },
      });
  
      if (response.ok) {
        localStorage.setItem("Authorization", auth);
        window.location.href = "index.html";
      } else{
        window.location.href = "login.html";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password.");
        console.log(error.response.status);
        // redirect the user to the login page
        window.location.href = "login.html";
      } else {
        console.log(error);
      }
    }
  });