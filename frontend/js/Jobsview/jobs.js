document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded");
  fetchJobs();

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.skills) {
    const skills = user.skills.split(",").map((skill) => skill.trim());
    fetchJobsForYou(skills);
  } else {
    console.error("User skills not found in local storage");
  }
});

function fetchJobs() {
  console.log("Fetching all jobs");
  fetch("http://localhost:3000/jobs")
    .then((response) => response.json())
    .then((jobs) => {
      const jobsList = document.getElementById("jobs-list");
      jobsList.innerHTML = ""; // Clear existing list

      jobs.forEach((job) => {
        const jobItem = document.createElement("li");
        jobItem.innerHTML = `${job.title}` +  ` - ` +  `${job.company_name}`  + ` <a> Read More </a>`;
        jobItem.addEventListener("click", () => {
          window.location.href = `JobPage.html?jobId=${job.job_id}`;
        });
        jobsList.appendChild(jobItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
    });
}
