document.querySelector('#submit').addEventListener('click', async (e) => {
  e.preventDefault(); // prevent form submission
  let name = document.querySelector('input[name="name"]').value;
  let email = document.querySelector('input[name="email"]').value;
  const auth = localStorage.getItem('Authorization');

  try {
    const response = await fetch('http://localhost:8080/api/teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      const responseData = await response.json();

      // show success message to the user
      const successMessage = `Teacher ${responseData.name} created successfully with email ${responseData.email}.`;
      alert(successMessage);

      console.log('Teacher created:', responseData);
    } else if (response.status === 401) {
      // redirect to login page
      window.location.replace('http://localhost:8080/login');
    }
  } catch (error) {
    console.error('Error creating teacher:', error);
  }
});
