export class JobFormHandler {
  constructor(jobService) {
    this.jobService = jobService;
    this.successModal = document.getElementById('successModal');
    this.closeModalButton = this.successModal.querySelector('.close');
  }

  getFormData() {
    const form = document.querySelector('#addjobsForm');
    const formData = new FormData(form);
    const allInputs = {};

    formData.forEach((value, key) => {
      allInputs[key] = value;
    });

    return allInputs;
  }

  verifyFormInputs(allInputs) {
    const requiredFieldsCount = 10; 
    if (Object.keys(allInputs).length !== requiredFieldsCount) {
      alert('Please fill all fields');
      return false;
    }
    return true;
  }

  addJobFromInputs() {
    console.log('Form submitted');
    const allJobsMenu = document.querySelector('#alljobsmenu');
    const jobsforyouMenu = document.querySelector('#jobsforyoumenu');
    const keywords = ["qa", "tester"];
    const allInputs = this.getFormData();
    const title = allInputs['jobtitle'];

    if (this.verifyFormInputs(allInputs)) {
      const job = {
        id: new Date().getTime(),
        title: `${allInputs['jobtitle']} - ${allInputs['agencyname']}`,
        fullname: allInputs['fullname'],
        emailaddress: allInputs['emailaddress'],
        phonenumber: allInputs['phonenumber'],
        location: allInputs['location'],
        requirements: allInputs['requirements'],
        timeago: `${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      };

      const containsKeywords = keywords.some(keyword => title.toLowerCase().includes(keyword));

      if (containsKeywords) {
        this.jobService.addJobToCollection(job, 'jobsForYou', jobsforyouMenu);
      } else {
        this.jobService.addJobToCollection(job, 'allJobs', allJobsMenu);
      }
      this.clearForm();
      this.showSuccessModal(); 
    }
  }

  clearForm() {
    const form = document.querySelector('#addjobsForm');
    form.reset();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addJobFromInputs();
  }

  HideJobsSection() {
    const addJobsSection = document.getElementById('addjobs');
    if (addJobsSection) {
      document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'sidebar') {
          section.style.display = '';
        }
      });
      document.getElementById('successModal').style.display = 'none';
      addJobsSection.style.display = 'none';
      showMessage('Job added successfully' , 'green');
    }
  }
  
  showSuccessModal() {
    this.successModal.style.display = 'block';
    setTimeout(() => {
        this.successModal.style.display = 'none';
        this.HideJobsSection();
      }, 3000);

    this.closeModalButton.addEventListener('click', () => {
      this.successModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
      if (event.target === this.successModal) {
        this.successModal.style.display = 'none';
      }
    });
  }
}

export function showMessage(message , color) {
  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer'; 
  document.body.appendChild(messageContainer);
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '0';
  messageContainer.style.left = '50%';
  messageContainer.style.transform = 'translateX(-50%)';
  messageContainer.style.backgroundColor = color;
  messageContainer.style.color = 'white';
  messageContainer.style.padding = '10px';
  messageContainer.style.zIndex = '1000';
  messageContainer.style.borderRadius = '5px';
  messageContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 2000);
}