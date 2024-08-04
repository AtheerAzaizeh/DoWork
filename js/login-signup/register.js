document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userType = form.getAttribute("data-user-type");
    const username = document.getElementById("username").value || null;
    const email = document.getElementById("email").value || null;
    const password = document.getElementById("password").value || null;
    const profileImageFile = document.getElementById("photoInput").files[0] || null;
    const skills = userType === "jobSeeker" ? document.getElementById("skills").value || null : null;

    console.log("Form Data:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Profile Image File:", profileImageFile);
    console.log("Skills:", skills);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImageFile) {
      formData.append("profile_picture", profileImageFile);
    }
    if (skills) {
      formData.append("skills", skills);
    }

    let endpoint;
    if (userType === "jobSeeker") {
      endpoint = `${CONFIG.API_URL}/api/register-jobseeker`;
    } else if (userType === "employeeSeeker") {
      endpoint = `${CONFIG.API_URL}/api/register-employeeseeker`;
    }

    console.log("Endpoint:", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log("Response received:", result);

      if (response.ok) {
        alert(result.message);
        window.location.href = "login.html"; 
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register. Please try again.');
    }
  });
});