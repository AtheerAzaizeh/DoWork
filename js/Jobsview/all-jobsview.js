export function fetchJobs() {
    fetch('http://localhost:3000/api/all-jobs')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        renderJobs(data);
    })
    .catch(error => console.error('Error fetching jobs:', error));
}

export function renderJobs(jobs) {

    if (jobs.length === 0) {
        console.log('No jobs available');
        return;
    }

    const job = jobs[0];

    document.getElementById('titlethejob').textContent = job.job_title;
    document.getElementById('timeago').textContent = new Date(job.timeago)
    document.getElementById('locationjob').textContent = job.location;
    document.getElementById('salary').textContent = job.salary;
    document.getElementById('positionoverview').textContent = job.position_overview;
    document.getElementById('requirements').textContent = `Degree: ${job.degree}, Skills: ${job.skills}`;
}