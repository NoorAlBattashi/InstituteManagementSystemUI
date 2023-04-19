document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('search-form');
    const resultTable = document.getElementById('result-table');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = searchInput.value;
        const auth = localStorage.getItem("Authorization");
        fetch(`http://localhost:8080/api/student/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Basic ${auth}`,
            },
        })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '../login.html';
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.querySelector('tbody');
                // remove previous search results from the table
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }

                // create a new img element
                const img = document.createElement('img');
                // set the src attribute of the image element
                img.src = "./student_images/" + data.imageName;

                // create a new td element for the image
                const tdImage = document.createElement('td');
                // append the image element to the td element
                tdImage.appendChild(img);

                // create new td elements for the other teacher information
                const tdId = document.createElement('td');
                tdId.textContent = data.id;
                const tdName = document.createElement('td');
                tdName.textContent = data.name;
                const tdEmail = document.createElement('td');
                tdEmail.textContent = data.email;

                // create a new tr element for the teacher
                const tr = document.createElement('tr');
                // append all td elements to the tr element
                tr.appendChild(tdId);
                tr.appendChild(tdImage);
                tr.appendChild(tdName);
                tr.appendChild(tdEmail);
                // append the tr element to the tbody element
                tbody.appendChild(tr);

                // show the result table
                const resultTable = document.getElementById('result-table');
                if (resultTable !== null) {
                    resultTable.style.display = "block";
                }
            })
            .catch(error => {
                alert(`Student not found`);
                console.error(error);
            });
    });
});
