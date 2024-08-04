document.addEventListener("DOMContentLoaded", () => {
    const jobSeekerBtn = document.getElementById("jobSeekerBtn");
    const employeeSeekerBtn = document.getElementById("employeeSeekerBtn");
  
    jobSeekerBtn.addEventListener("click", () => {
      window.location.href = "register-job-seeker.html";
    });
  
    employeeSeekerBtn.addEventListener("click", () => {
      window.location.href = "register-employee-seeker.html";
    });
  });