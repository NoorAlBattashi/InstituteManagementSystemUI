document.querySelector('#submit').addEventListener('click', async (e) => {
    e.preventDefault(); // prevent form submission
    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let image = document.querySelector('input[name="image"]').files[0];
    const auth = localStorage.getItem('Authorization');
    let currForm = new FormData();
    currForm.append("name", name);
    currForm.append("email", email);
    currForm.append("image", image);
    try {
      const response = await fetch('http://localhost:8080/api/student/withImage', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body: currForm,
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // show success message to the user
        const successMessage = `Student ${responseData.name} created successfully with email ${responseData.email}.`;
        alert(successMessage);
        
        console.log('Student created:', responseData);
      } else if (response.status === 401) {
        // redirect to login page
        window.location.replace('../login.html');
      }
    } catch (error) {
      console.error('Error creating Student:', error);
    }
  });
  