document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("job-form");

  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employerId = sessionStorage.getItem('employer_id');
    if (!employerId) {
      alert("Employer ID not found. Please log in as an employee seeker.");
      return;
    }

    const generateRandomSalary = () => {
      const min = 300; 
      const max = 1000; 
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const jobData = {
      employer_id: employerId,
      title: document.getElementById("job-title").value,
      description: document.getElementById("description").value,
      location: document.getElementById("location").value || null,
      salary: generateRandomSalary().toString(), 
      skill: document.getElementById("skills").value || null,
    };

    console.log("Job data to be sent:", jobData);

    try {
      const response = await fetch(`${CONFIG.API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Redirect to employer home page or other actions
        window.location.href = "employeeseekerhmpg.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  });
});
