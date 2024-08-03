export class CreateElements {
  constructor() {}

 
  addJobToDOM(job, list, jobService) {
    const li = document.createElement("li");
    li.setAttribute("data-id", job.id);
    li.textContent = job.title;
    li.appendChild(this.createArrowRight(job, jobService));
    li.appendChild(this.createDeleteButton(job.id, list, jobService));
    list.appendChild(li);
  }

 
  createArrowRight(job) {
    const arrowRight = document.createElement('i');
    arrowRight.className = 'btnarrowright fas fa-arrow-right arrow-right-icon';
    arrowRight.style.cursor = 'pointer';
    arrowRight.addEventListener('click', () => {
      localStorage.setItem('selectedJob', JSON.stringify(job));
      window.location.href = 'jobsview.html';
    });
    return arrowRight;
  }

  createDeleteButton(jobs, list, jobService) {
    const deleteButton = document.createElement('div');
    deleteButton.className = 'trash-box';

    const trash = document.createElement('div');
    trash.className = 'trash';

    const trashTop = document.createElement('div');
    trashTop.className = 'trash-top';

    const trashBtm = document.createElement('div');
    trashBtm.className = 'trash-btm';

    const trashLines = document.createElement('div');
    trashLines.className = 'trash-lines';

    const trashLine1 = document.createElement('div');
    trashLine1.className = 'trash-line';

    const trashLine2 = document.createElement('div');
    trashLine2.className = 'trash-line';

    trashLines.appendChild(trashLine1);
    trashLines.appendChild(trashLine2);
    trashBtm.appendChild(trashLines);
    deleteButton.appendChild(trash);
    deleteButton.appendChild(trashTop);
    deleteButton.appendChild(trashBtm);
    if(list.id != 'deletejobinclude'){
      deleteButton.addEventListener("click", () => {
      jobService.deleteJob(jobs, list);
    });
  }
    return deleteButton;
  }
}
