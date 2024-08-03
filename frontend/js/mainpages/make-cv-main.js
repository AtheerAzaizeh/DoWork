import { toggleSection, saveSection, submitCV } from '../make-cv/cvHelpers.js';
import { openPhotoInput, displaySelectedPhoto } from '../make-cv/photoHelpers.js';
import { fetchCities, fetchCountries, fetchUniversities } from '../make-cv/dataFetchers.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.arrow-down').forEach(button => {
    button.addEventListener('click', () => {
      toggleSection(button.getAttribute('data-section'));
    });
  });

  document.querySelectorAll('button[data-current-section]').forEach(button => {
    button.addEventListener('click', () => {
      saveSection(button.getAttribute('data-current-section'), button.getAttribute('data-next-section'));
    });
  });

  document.getElementById('photoInput').addEventListener('change', (event) => {
    displaySelectedPhoto(event.target);
  });

  document.getElementById('profile_image_url').addEventListener('click', () => {
    openPhotoInput();
  });

  flatpickr('.flatpickr', {
    dateFormat: 'Y-m-d',
  });

  fetchCountries();
  fetchCities();
  fetchUniversities();
});
