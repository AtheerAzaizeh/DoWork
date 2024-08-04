export function renderJobs(jobs) {
    const allJobsMenu = document.getElementById('alljobsmenu');
    const jobsForYouMenu = document.getElementById('jobsforyoumenu');

    if (jobs.length === 0) {
        console.log('No jobs available');
        return;
    }

    allJobsMenu.innerHTML = '';
    jobsForYouMenu.innerHTML = '';

    jobs.forEach(job => {
        let jobElement = document.createElement('li');
        jobElement.className = 'job-item';

        let jobText = document.createElement('span');
        jobText.textContent = `${job.title} - ${job.company_name}`;

        let arrowIcon = document.createElement('i');
        arrowIcon.className = 'fa-solid fa-arrow-right';

        jobElement.appendChild(jobText);
        jobElement.appendChild(arrowIcon);
        allJobsMenu.appendChild(jobElement);

        if (job.isForYou) {
            let jobForYouElement = document.createElement('li');
            jobForYouElement.className = 'job-item';

            let jobForYouText = document.createElement('span');
            jobForYouText.textContent = `${job.job_title} - ${job.company_title}`;

            let arrowIconForYou = document.createElement('i');
            arrowIconForYou.className = 'fa-solid fa-arrow-right';

            jobForYouElement.appendChild(jobForYouText);
            jobForYouElement.appendChild(arrowIconForYou);
            jobsForYouMenu.appendChild(jobForYouElement);
        }
    });
}
