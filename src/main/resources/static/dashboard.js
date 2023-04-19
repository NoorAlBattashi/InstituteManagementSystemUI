const auth = localStorage.getItem("Authorization");
//staff
fetch('http://localhost:8080/api/teacher', {
    method:'GET',
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Basic ${auth}`,
      },  
})
.then(response => {
    if (response.status === 401){
        window.location.href = './login.html';
    }
    return response.json();
})
.then(teachers => {
  const tbody = document.querySelector('#staff-tbody');
  teachers.forEach(teacher => {
    // create a new img element
    const img = document.createElement('img');
    // set the src attribute of the image element
    img.src = "/staff/staff_images/" + teacher.imageName;

    // create a new td element for the image
    const tdImage = document.createElement('td');
    // append the image element to the td element
    tdImage.appendChild(img);

    // create new td elements for the other teacher information
    const tdId = document.createElement('td');
    tdId.textContent = teacher.id;
    const tdName = document.createElement('td');
    tdName.textContent = teacher.name;
    const tdEmail = document.createElement('td');
    tdEmail.textContent = teacher.email;

    // create a new tr element for the teacher
    const tr = document.createElement('tr');
    // append all td elements to the tr element
    tr.appendChild(tdId);
    tr.appendChild(tdImage);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    // append the tr element to the tbody element
    tbody.appendChild(tr);
  });
});
//student
fetch('http://localhost:8080/api/student', {
    method:'GET',
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Basic ${auth}`,
      },  
})
.then(response => {
    if (response.status === 401){
        window.location.href = './login.html';
    }
    return response.json();
})
.then(students => {
  const tbody = document.querySelector('#student-tbody');
  students.forEach(student => {
    // create a new img element
    const img = document.createElement('img');
    // set the src attribute of the image element
    img.src = "/student/student_images/" + student.imageName;

    // create a new td element for the image
    const tdImage = document.createElement('td');
    // append the image element to the td element
    tdImage.appendChild(img);

    // create new td elements for the other teacher information
    const tdId = document.createElement('td');
    tdId.textContent = student.id;
    const tdName = document.createElement('td');
    tdName.textContent = student.name;
    const tdEmail = document.createElement('td');
    tdEmail.textContent = student.email;

    // create a new tr element for the teacher
    const tr = document.createElement('tr');
    // append all td elements to the tr element
    tr.appendChild(tdId);
    tr.appendChild(tdImage);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    // append the tr element to the tbody element
    tbody.appendChild(tr);
  });
});
