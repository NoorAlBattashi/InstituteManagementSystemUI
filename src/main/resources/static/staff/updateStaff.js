const searchForm = document.querySelector('#search-form');
const resultForm = document.querySelector('#result-form');
const auth = localStorage.getItem("Authorization");

searchForm.addEventListener('submit', async (event) =>{
  event.preventDefault();
  const id = document.querySelector('#search-input').value;
  const response = await fetch(`http://localhost:8080/api/teacher/${id}`, {
    method:'GET',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Basic ${auth}`,
    },
  });

  if (response.status === 401){
    window.location.href = '../login.html'; // Redirect to login page
  }else{
  const data = await response.json();
  if(response.ok){
  document.querySelector('#name_input').value = data.name;
  document.querySelector('#email_input').value = data.email;
  }else{
        alert('Staff not found');
    }
  }
});

resultForm.addEventListener('submit', async(event) => {
  event.preventDefault();
  const id = document.querySelector('#search-input').value;
  const name = document.querySelector('#name_input').value;
  const email = document.querySelector('#email_input').value;
  const params = new URLSearchParams({name, email});
  const response = await fetch(`http://localhost:8080/api/teacher/${id}?${params}`,{
    method:'PUT',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Basic ${auth}`,
    },
  });
  if(response.status === 401){
    window.location.href = '../login.html'; // Redirect to login page
  }else{
  const data = await response.json();
  console.log(data);
   // show success message to the user
   const successMessage = `Teacher ${name} updated successfully with email ${email}.`;
   alert(successMessage);
  }
});

