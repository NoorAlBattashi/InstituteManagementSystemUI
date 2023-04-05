document.addEventListener("DOMContentLoaded", function(){
    const searchForm = document.getElementById('search-form');
    const resultForm = document.getElementById('result-form');
    const searchInput = document.getElementById('search-input');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    
    searchForm.addEventListener('submit', (event)=>{
        event.preventDefault();
    
        const id = searchInput.value;
        const auth = localStorage.getItem("Authorization");
        fetch(`http://localhost:8080/api/teacher/${id}`, {
            method:'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Basic ${auth}`,
              },  
        })
        .then(response => {
            if (response.status === 401){
                window.location.href = 'http://localhost:8080/login.html';
            }
            return response.json();
        })
        .then(data =>{
            nameInput.value = data.name;
            emailInput.value = data.email;
        })
        .catch(error => {
            alert(`Staff not found`);
            console.error(error);
        });
    });
});
