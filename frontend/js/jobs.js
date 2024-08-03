document.addEventListener('DOMContentLoaded', () => {
    const allJobsTab = document.getElementById('alljobs');
    const jobsForYouTab = document.getElementById('jobsforyou');
    const allJobsMenu = document.getElementById('alljobsmenu');
    const jobsForYouMenu = document.getElementById('jobsforyoumenu');
    const userId = sessionStorage.getItem('user_id');

    if (!userId) {
        alert('User ID not found. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    allJobsTab.addEventListener('click', () => {
        switchTab(allJobsTab, jobsForYouTab);
        allJobsMenu.style.display = 'block';
        jobsForYouMenu.style.display = 'none';
    });

    jobsForYouTab.addEventListener('click', () => {
        switchTab(jobsForYouTab, allJobsTab);
        fetchJobsBySkills(userId);
        allJobsMenu.style.display = 'none';
        jobsForYouMenu.style.display = 'block';
    });

    function switchTab(activeTab, inactiveTab) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
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
        jobsForYouMenu.innerHTML = '';

        if (jobs.length === 0) {
            jobsForYouMenu.innerHTML = '<li>No jobs found matching your skills.</li>';
            return;
        }

        jobs.forEach(job => {
            const jobElement = document.createElement('li');
            jobElement.classList.add('job');

            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company_name}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Skills:</strong> ${job.skill}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <a href="#" class="read-more">Read More</a>
            `;

            jobsForYouMenu.appendChild(jobElement);
        });
    }
});
