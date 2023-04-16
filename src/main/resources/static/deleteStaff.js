const searchForm = document.getElementById('search-form');
const resultForm = document.getElementById('result-form');

searchForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const id = document.getElementById('search-input').value;
    const auth = localStorage.getItem("Authorization");
    const response = await fetch(`http://localhost:8080/api/teacher/${id}`, {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Basic ${auth}`,
        }
    });
    if(response.status === 401){
        window.location.href = '/login.html';
    }else if (response.ok){
        const teacher = await response.json();
        document.getElementById('name_input').value = teacher.name;
        document.getElementById('email_input').value = teacher.email;
    }else{
        alert('Staff not found');
    }
});

resultForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const id = document.getElementById('search-input').value;
    const auth = localStorage.getItem("Authorization");
    const response = await fetch(`http://localhost:8080/api/teacher/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Basic ${auth}`,
        }
    });
    if(response.status === 401){
        window.location.href = "/login.html";
    } else if(response.ok){
        alert('Staff deleted successfully');
        // clear the result form after successful deletion
        document.getElementById('name_input').value = '';
        document.getElementById('email_input').value = '';
    } else {
        alert('Failed to delete staff');
    }
});