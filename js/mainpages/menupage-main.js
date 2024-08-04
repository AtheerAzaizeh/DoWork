document.addEventListener("DOMContentLoaded", function () {
  fetchJobs();
});

function fetchJobs() {
  fetch(`${CONFIG.API_URL}/jobs`) // Adjust the URL to your API endpoint
    .then((response) => response.json())
    .then((jobs) => {
      const allJobsMenu = document.getElementById("alljobsmenu");
      const jobsForYouMenu = document.getElementById("jobsforyoumenu");

      allJobsMenu.innerHTML = ""; // Clear existing list
      jobsForYouMenu.innerHTML = ""; // Clear existing list

      jobs.forEach((job) => {
        const jobItem = document.createElement("li");
        jobItem.innerHTML = `${job.title} <a href="#">Read More</a>`;
        allJobsMenu.appendChild(jobItem);

        // Assuming "Jobs For You" is a subset or specific filter of all jobs
        if (job.isForYou) {
          // Replace with actual condition
          const jobItemForYou = document.createElement("li");
          jobItemForYou.innerHTML = `${job.title} - ${job.company} <a href="#">Read More</a>`;
          jobsForYouMenu.appendChild(jobItemForYou);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
    });
}
