import { JobService } from './JobService.js';
import { MenuService } from './MenuService.js';
import { LocationService } from './LocationService.js';
import { JobFormHandler } from './JobFormHandler.js';
import { EventListeners } from './EventListeners.js';
document.addEventListener('DOMContentLoaded', () => {
  const jobService = new JobService();
  const menuService = new MenuService();
  const locationService = new LocationService();
  const jobFormHandler = new JobFormHandler(jobService); 
  const eventListeners = new EventListeners(jobService, menuService, locationService, jobFormHandler);
  

  document.querySelector('#addjobsForm').addEventListener('submit', (event) => jobFormHandler.handleSubmit(event));
  eventListeners.addEventListeners();
});