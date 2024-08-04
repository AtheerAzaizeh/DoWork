// js/jobsview/all-jobsview.js

async function fetchJobDetails(jobId) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/${jobId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job details');
      }
      const job = await response.json();
      displayJobDetails(job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  }
  
  function displayJobDetails(job) {
    document.querySelector('.titlethejob').textContent = job.title;
    document.querySelector('.timeago').textContent = job.created_at;
    document.getElementById('locationjob').textContent = job.location;
    document.getElementById('salary').textContent = job.salary;
    document.querySelector('.positionoverview').textContent = job.description;
    document.querySelector('.requirements').textContent = job.skill;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');
    if (jobId) {
      fetchJobDetails(jobId);
    }
  
    document.getElementById('send-cv-button').addEventListener('click', () => {
      // Handle sending CV logic here
      alert('CV sent!');
    });
  });
  