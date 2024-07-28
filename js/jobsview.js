import { CreateElements } from './CreateElements.js';
import { JobService } from './JobService.js';
import { showMessage } from './JobFormHandler.js';
import { fetchJobs} from './Jobsview/all-jobsview.js';

const showmodal = document.getElementById('modal');
const buttonok = document.getElementById('modalOkButton');
const sendcv = document.getElementById('sendcv');
const delbutton = document.getElementById('deletejobinclude');

const jobService = new JobService();
jobService.loadFromLocalStorage();
const selectedJob = JSON.parse(localStorage.getItem('selectedJob')) ;
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min + '$/hour';
}
function addelemntdeletebutton()
{   
    const createElement = new CreateElements();
    const delbtn = createElement.createDeleteButton(selectedJob , delbutton , jobService);
    console.log(selectedJob);
    delbtn.style.marginTop = '7px';
    delbtn.style.marginRight = '18px';
    delbutton.appendChild(delbtn);
}

function showJob() {
  addelemntdeletebutton();

 if(selectedJob.salary === undefined){
   selectedJob.salary = getRandomValue(50 , 250);
 }
 
 if (selectedJob) {
     document.getElementById('titlethejob').textContent = selectedJob.title;
     document.getElementById('timeago').textContent = selectedJob.timeago;
     document.getElementById('locationjob').innerHTML = `<i class="fa-solid fa-location-dot" style="font-size: 24px;"></i> ${selectedJob.location}`;
     document.getElementById('requirements').innerHTML = `<h2>Requirements</h2>${selectedJob.requirements}`;
     document.getElementById('salary').innerHTML = `<i class="fa-solid fa-tag" style="font-size: 24px;"></i> ${selectedJob.salary}`;

     let [workTitle, agencyName] = selectedJob.title.split(' - ');

     const overviewText = `
         <h2>Position Overview</h2>
         We are looking for a ${workTitle} to join our team at ${agencyName}.
         As a ${workTitle} at ${agencyName}, you will play a crucial role in ${selectedJob.requirements.toLowerCase()}.
         This position is based in ${selectedJob.location}. You will collaborate closely with other team members to ensure the success of our projects.
     `;

     document.getElementById('positionoverview').innerHTML = overviewText;
 }
}

sendcv.addEventListener('click', () => {
  showmodal.style.display = 'block';
  sendcv.firstChild.style.backgroundColor ='#0056b3';
  sendcv.firstChild.textContent = 'Sent';
  sendcv.firstChild.style.pointerEvents = 'none';
});

window.addEventListener('click', (event) => {
        if (event.target === showmodal || event.target === buttonok) {
          showmodal.style.display = 'none';
        }
    });

delbutton.addEventListener('click', ()=> {   
        for (let i = 0; i < jobService.allJobs.length; i++) {
          if(jobService.allJobs[i].title === selectedJob.title){
            jobService.allJobs = jobService.allJobs.filter(job => job.id !== selectedJob.id);
            jobService.saveToLocalStorage();
            console.log( selectedJob.title,'Job deleted successfully');
            showMessage('Plaease Waiting...' , 'red');
            setTimeout(() => {history.back(); showMessage('Job deleted successfully' , 'green');}, 2000);
          }
        }
        for (let i = 0; i < jobService.jobsForYou.length; i++) {
          if(jobService.jobsForYou[i].title === selectedJob.title){
            jobService.jobsForYou = jobService.jobsForYou.filter(job => job.id !== selectedJob.id);
            jobService.saveToLocalStorage();
            console.log( selectedJob.title , "it's deleted successfully");
            showMessage('Plaease Waiting...' , 'red');
            setTimeout(() => {history.back(); showMessage('Job deleted successfully' , 'green');}, 2000);
          }
        }
    }); 

document.getElementById('arrowleft').addEventListener('click', () => {
        sendcv.firstChild.textContent = 'Send CV';
        history.back();
    });

document.addEventListener('DOMContentLoaded', () => {
    showJob();
    fetchJobs();
});
