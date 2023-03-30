const searchForm = document.getElementById('search-form');
const resultForm = document.getElementById('result-form');

searchForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const id = document.getElementById('search-input').value;
    const response = await fetch(`http://localhost:8080/api/teacher/${id}`);
    const teacher = await response.json();
    if(response.ok){
        document.getElementById('name_input').value = teacher.name;
        document.getElementById('email_input').value = teacher.email;
    }else{
        alert('Staff not found');
    }
});

resultForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const id = document.getElementById('search-input').value;
    const response = await fetch(`http://localhost:8080/api/teacher/${id}`, {method: 'DELETE'});
    if(response.ok){
        alert('Staff deleted successfully');
        // clear the result form after successful deletion
        document.getElementById('name_input').value = '';
        document.getElementById('email_input').value = '';
    }else{
        alert('Failed to delete staff');
    }
});