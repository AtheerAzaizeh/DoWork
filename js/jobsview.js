import { CreateElements } from './CreateElements.js';
import { JobService } from './JobService.js';

document.addEventListener('DOMContentLoaded', () => {

    const jobService = new JobService();
    const createElement = new CreateElements();
    jobService.loadFromLocalStorage();
    const selectedJob = JSON.parse(localStorage.getItem('selectedJob')) ;

    addelemntdeletebutton();
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
    
    const showmodal = document.getElementById('modal');
    const buttonok = document.getElementById('modalOkButton');
    const sendcv = document.getElementById('sendcv');
    const delbutton = document.getElementById('deletejobinclude');

    function addelemntdeletebutton()
    {   
        const delbtn = createElement.createDeleteButton(selectedJob , delbutton , jobService);
        console.log(selectedJob);
        delbtn.style.marginTop = '7px';
        delbtn.style.marginRight = '18px';
        delbutton.appendChild(delbtn);
    }

    sendcv.addEventListener('click', () => {
       showmodal.style.display = 'block';
        sendcv.firstChild.textContent = 'Sent';
    });

    window.addEventListener('click', (event) => {
        if (event.target === showmodal || event.target === buttonok) {
          showmodal.style.display = 'none';
        }
    });
    function addelemntdeletebutton()
    {   
        const delbutton = document.getElementById('deletejobinclude');
        const delbtn = createElement.createDeleteButton(selectedJob , delbutton , jobService);
        console.log(selectedJob);
        delbtn.style.marginTop = '7px';
        delbtn.style.marginRight = '18px';
        delbutton.appendChild(delbtn);
    }

    delbutton.addEventListener('click', ()=> {   
        for (let i = 0; i < jobService.allJobs.length; i++) {
          if(jobService.allJobs[i].title === selectedJob.title){
            jobService.allJobs = jobService.allJobs.filter(job => job.id !== selectedJob.id);
            jobService.saveToLocalStorage();
          }
        }
        for (let i = 0; i < jobService.jobsForYou.length; i++) {
          if(jobService.jobsForYou[i].title === selectedJob.title){
            jobService.jobsForYou = jobService.jobsForYou.filter(job => job.id !== selectedJob.id);
            jobService.saveToLocalStorage();
          }
        }
    });

    document.getElementById('arrowleft').addEventListener('click', () => {
        sendcv.firstChild.textContent = 'Send CV';
        history.back();
    });

});
