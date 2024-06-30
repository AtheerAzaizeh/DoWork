export class EventListeners {
  constructor(jobService, menuService, locationService, jobFormHandler ) {
    this.jobService = jobService;
    this.menuService = menuService;
    this.locationService = locationService;
    this.jobFormHandler = jobFormHandler;
  }

  async addEventListeners() {
    this.setUIEventListeners();
    this.ensureSingleCheckboxSelection('single-cb');
    this.ensureSingleCheckboxSelection('cb-times');

    await this.jobService.fetchJobs();
    this.jobService.fetchAllJobs();
  }

  setUIEventListeners() {
    document.getElementById('alljobs').addEventListener('click', () => this.handleMenuSwitch(true));
    document.getElementById('jobsforyou').addEventListener('click', () => this.handleMenuSwitch(false));
    document.getElementById('addbutton').addEventListener('click', () => this.showAddJobsSection());
    document.getElementById('arrowleft').addEventListener('click', (event) => this.returnBack(event));
    document.getElementById('Arrowleft').addEventListener('click', (event) => this.returnBack(event));
  }


  ensureSingleCheckboxSelection(className) {
    const checkboxes = document.querySelectorAll(`.${className}`);
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          checkboxes.forEach(cb => {
            if (cb !== this) cb.checked = false;
          });
        }
      });
    });
  }

  handleMenuSwitch(isAllJobs) {
    const activeButton = document.getElementById('alljobs');
    const inactiveButton = document.getElementById('jobsforyou');
    const activeMenu = document.getElementById('alljobsmenu');
    const inactiveMenu = document.getElementById('jobsforyoumenu');
    
    this.menuService.toggleMenuDisplay(isAllJobs, activeButton, inactiveButton, activeMenu, inactiveMenu);
    isAllJobs ? this.jobService.fetchAllJobs() : this.jobService.fetchJobsForUser();
  }

  showAddJobsSection() {
    const addJobsSection = document.getElementById('addjobs');
    if (addJobsSection) {
      document.querySelectorAll('section').forEach(section => section.style.display = 'none');
      addJobsSection.style.display = 'block';
      this.locationService.initializeLocations();
    }
  }

  returnBack(event) {
    if (event.target.id.includes('arrowleft')) {
      window.location = '../index.html';
    } else if (event.target.id.includes('Arrowleft')) {
      const addJobsSection = document.getElementById('addjobs');
      document.querySelectorAll('section').forEach(section => section.style.display = '');
      addJobsSection.style.display = 'none';
    }
  }
}
