import { renderJobs } from "./renderJobs.js";

export async function fetchJobs() {
    try{
        await fetch('https://onlybackend-wgcr.onrender.com/api/all-jobs')
        .then(response => {
        return response.json();
        })
        .then(data => {
        renderJobs(data);
    })
    }catch(error){console.error(error.message)}
}
