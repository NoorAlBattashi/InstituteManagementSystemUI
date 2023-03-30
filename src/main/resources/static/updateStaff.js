const searchForm = document.querySelector('#search-form');
const resultForm = document.querySelector('#result-form');

searchForm.addEventListener('submit', async (event) =>{
  event.preventDefault();
  const id = document.querySelector('#search-input').value;
  const response = await fetch(`http://localhost:8080/api/teacher/${id}`);
  const data = await response.json();
  if(response.ok){
  document.querySelector('#name_input').value = data.name;
  document.querySelector('#email_input').value = data.email;
  }else{
        alert('Staff not found');
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
  });
  const data = await response.json();
  console.log(data);
   // show success message to the user
   const successMessage = `Teacher ${name} updated successfully with email ${email}.`;
   alert(successMessage);
});

