export function renderJobs(jobs) {
    const getalljobs = document.getElementById('getalljobs');

    if (jobs.length === 0) {
        console.log('No jobs available');
        return;
    }

    getalljobs.innerHTML = '';

   for(let i = 0 ; i < jobs.length ; i++){

    let jobElement = document.createElement('div');
    jobElement.className = 'job-item';

    jobElement.textContent = `${jobs[i].job_title} - ${jobs[i].company_title}`;

    getalljobs.appendChild(jobElement);
   }
}