$(document).ready(function(){
    $('#submit').click(function(e) {
        e.preventDefault(); // prevent form submission
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        $.ajax({
          url: 'http://localhost:8080/api/teacher',
          type: 'POST',
          data: { name: name, email: email },
          success: function(response) {
             // show success message to the user
             const successMessage = `Teacher ${name} created successfully with email ${email}.`;
             alert(successMessage);

            console.log('Teacher created:', response);
          },
          error: function(xhr, status, error) {
            console.error('Error creating teacher:', error);
          }
        });
      });
    });