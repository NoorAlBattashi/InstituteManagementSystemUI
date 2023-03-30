document.addEventListener("DOMContentLoaded", function(){
    const searchForm = document.getElementById('search-form');
    const resultForm = document.getElementById('result-form');
    const searchInput = document.getElementById('search-input');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    
    searchForm.addEventListener('submit', (event)=>{
        event.preventDefault();
    
        const id = searchInput.value;
        fetch(`http://localhost:8080/api/teacher/${id}`)
        .then(response => response.json())
        .then(data =>{
            nameInput.value = data.name;
            emailInput.value = data.email;
        })
        .catch(error => console.error(error))
    });
});
