import { openPhotoInput, displaySelectedPhoto } from '../make-cv/photoUploader.js';
import { toggleSection, saveSection, submitCV } from '../make-cv/formSections.js';
import { fetchCities, fetchCountries, fetchUniversities } from '../make-cv/dataFetchers.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchCities();
  fetchCountries();
  fetchUniversities();
});

document.getElementById('photoInput').addEventListener('change', (e) => displaySelectedPhoto(e.target));
document.getElementById('profile_image_url').addEventListener('click', openPhotoInput);

document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', (e) => {
      const sectionId = e.target.getAttribute('data-section');
      toggleSection(sectionId);
    });
  });

  document.querySelectorAll('button[data-current-section]').forEach(button => {
    button.addEventListener('click', (e) => {
        const currentSection = e.target.getAttribute('data-current-section');
        const nextSectionId = e.target.getAttribute('data-next-section');
        saveSection(currentSection, nextSectionId);
    });
});

document.getElementById('next-step').addEventListener('click' , submitCV);