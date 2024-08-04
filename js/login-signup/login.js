  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const userType = document.querySelector('input[name="userType"]:checked').value;

      const data = { email, password, userType };

      try {
        const response = await fetch(`${CONFIG.API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          sessionStorage.setItem('token', result.token);
          sessionStorage.setItem('user_id', result.user_id);

          if (result.userType === 'employeeSeeker') {
            window.location.href = "employeeseekerhmpg.html";
          } else {
            window.location.href = "jobseekerhmpg.html";
          }
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in.');
      }
    });
  });

