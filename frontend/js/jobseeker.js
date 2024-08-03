document.addEventListener('DOMContentLoaded', () => {
    const jobListContainer = document.getElementById('job-list');
    const jobsForYouLink = document.getElementById('jobsForYouLink');
    const userId = sessionStorage.getItem('user_id');

    if (!userId) {
        alert('User ID not found. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    jobsForYouLink.addEventListener('click', (event) => {
        event.preventDefault();
        fetchJobsBySkills(userId);
        highlightLink(jobsForYouLink);
    });

    function highlightLink(linkElement) {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        linkElement.classList.add('active');
    }

    async function fetchJobsBySkills(userId) {
        try {
            const response = await fetch(`http://localhost:3000/api/compare-skills/${userId}`);
            const data = await response.json();

            if (response.ok) {
                displayJobs(data.jobs);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    function displayJobs(jobs) {
        jobListContainer.innerHTML = '';

        if (jobs.length === 0) {
            jobListContainer.innerHTML = '<p>No jobs found matching your skills.</p>';
            return;
        }

        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');

            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company_name}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Skills:</strong> ${job.skill}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
            `;

            jobListContainer.appendChild(jobElement);
        });
    }
});
