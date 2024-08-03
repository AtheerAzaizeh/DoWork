import { CreateElements } from './CreateElements.js';
export class JobService {
  constructor() {
    this.allJobs = [];
    this.jobsForYou = [];
    this.createElements = new CreateElements();
  }
 
  async fetchJobs() {
    try {
      const response = await fetch('data/jobs.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.allJobs = [...data.alljobs];
      this.jobsForYou = [...data.jobsforyou];
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }
  saveToLocalStorage() {
    localStorage.setItem('allJobs', JSON.stringify(this.allJobs));
    localStorage.setItem('jobsForYou', JSON.stringify(this.jobsForYou));
  }

  loadFromLocalStorage() {
    this.allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
    this.jobsForYou = JSON.parse(localStorage.getItem('jobsForYou')) || [];
  }

  fetchAllJobs() {
    this.renderJobs(this.allJobs, document.getElementById('alljobsmenu'));
  }

  fetchJobsForUser() {
    this.renderJobs(this.jobsForYou, document.getElementById('jobsforyoumenu'));
  }
  renderJobs(jobs, menu) {
    menu.innerHTML = '';
    jobs.forEach(job => this.createElements.addJobToDOM(job, menu, this));
  }

  addJobToCollection(job, collectionName, list) {
    if (['allJobs', 'jobsForYou'].includes(collectionName)) {
      this[collectionName].push(job);
      this.saveToLocalStorage();
      this.renderJobs(this[collectionName], list);
    } else {
      console.error('Invalid collection name');
    }
  }
  getJobById(id) {
    return [...this.allJobs, ...this.jobsForYou].find(job => job.id === id);
  }
  deleteJob(jobId, list) {
    if (list.id === 'alljobsmenu') {
      this.allJobs = this.allJobs.filter(job => job.id !== jobId);
      this.saveToLocalStorage();
      this.renderJobs(this[list.id === 'alljobsmenu' ? 'allJobs' : 'jobsForYou'], list);
      console.log('Job deleted successfully');

    }else if (list.id === 'jobsforyoumenu') {
      this.jobsForYou = this.jobsForYou.filter(job => job.id !== jobId);
      this.saveToLocalStorage();
      this.renderJobs(this[list.id === 'alljobsmenu' ? 'allJobs' : 'jobsForYou'], list);
      console.log('Job deleted successfully');
    }
    else{
      console.error('Invalid list ID');
      return;
    }
   
  }
}
