// src/js/mainpages/menupage-main.js
import { fetchJobs } from "../Jobsview/fetchJobs.js";
import { renderJobs } from "../Jobsview/renderJobs.js";

document.addEventListener('DOMContentLoaded', async () => {
    const jobs = await fetchJobs();
    renderJobs(jobs);

    
});


