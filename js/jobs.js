document.addEventListener('DOMContentLoaded', function() {
    const allJobsMenu = document.getElementById('alljobsmenu');
    const jobsForYouMenu = document.getElementById('jobsforyoumenu');

    // Check if user_skills exists in local storage
    const userSkills = localStorage.getItem('user_skills');
    if (!userSkills) {
        console.warn("User skills not found in local storage");
        // Optionally, set a default value or handle this case appropriately
        localStorage.setItem('user_skills', JSON.stringify([]));
    } else {
        console.log("User skills found:", JSON.parse(userSkills));
    }

    fetchJobs();

    function fetchJobs() {
        console.log("Fetching jobs from API...");
        fetch(`${CONFIG.API_URL}/jobs`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Jobs fetched successfully:", data);
                displayJobs(data, allJobsMenu);
                displayJobs(data, jobsForYouMenu);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }

    function displayJobs(jobs, container) {
        console.log(`Displaying jobs in container: ${container.id}`);
        container.innerHTML = '';

        jobs.forEach(job => {
            console.log("Processing job:", job);
            const jobItem = document.createElement('li');
            jobItem.classList.add('job-item');

            jobItem.innerHTML = `
                <div class="job-title">${job.title}</div>
                <div class="job-description">${job.description}</div>
                <div class="job-company">Company: ${job.company_name}</div>
                <div class="job-username">Posted by: ${job.username}</div>
            `;

            container.appendChild(jobItem);
        });
        console.log("Jobs displayed successfully in container:", container.id);
    }
});
