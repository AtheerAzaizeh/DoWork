document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const companyDetailsSection = document.getElementById("company-details-section");
  const companyDetailsInputs = companyDetailsSection.querySelectorAll('input, textarea');

  const userTypeInputs = document.querySelectorAll('input[name="userType"]');
  userTypeInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      if (e.target.value === 'employeeSeeker') {
        companyDetailsSection.style.display = "block";
        companyDetailsInputs.forEach(input => input.required = true);
      } else {
        companyDetailsSection.style.display = "none";
        companyDetailsInputs.forEach(input => input.required = false);
      }
    });
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    const data = { email, password, userType };

    try {
      const response = await fetch('http://localhost:3000/api/login', {
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
          const companyData = {
            employee_seeker_id: result.user_id,
            company_name: document.getElementById('company_name').value,
            company_description: document.getElementById('company_description').value,
            contact_email: document.getElementById('contact_email').value,
          };

          try {
            const companyResponse = await fetch('http://localhost:3000/employers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(companyData)
            });

            const companyResult = await companyResponse.json();
            if (companyResponse.ok) {
              sessionStorage.setItem('employer_id', companyResult.employerId);
              alert(companyResult.message);
              window.location.href = "employeeseekerhmpg.html";
            } else {
              alert(companyResult.message);
            }
          } catch (companyError) {
            console.error('Error saving company details:', companyError);
          }
        } else {
          window.location.href = "jobseekerhmpg.html";
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
});
