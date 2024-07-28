document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country');
  const universitySelect = document.getElementById('institution_name');
  const locationSelect = document.getElementById('location');

  fetch('https://countriesnow.space/api/v0.1/countries/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: 'Israel'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        data.data.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          locationSelect.appendChild(option);
        });
      }
    })
    .catch(error => console.error('Error:', error));

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching countries:', error));

  countrySelect.addEventListener('change', () => {
    const selectedCountry = countrySelect.value;
    universitySelect.innerHTML = '';

    fetch(`http://universities.hipolabs.com/search?country=${selectedCountry}`)
      .then(response => response.json())
      .then(universities => {
        universities.forEach(university => {
          const option = document.createElement('option');
          option.value = university.name;
          option.textContent = university.name;
          universitySelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching universities:', error));
  });
});

// Toggle section visibility
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
}

// Save section data to sessionStorage and move to the next section
function saveSection(currentSection, nextSectionId) {
  let data = {};

  if (currentSection === 'personal_details') {
    data = {
      first_name: document.getElementById('first_name')?.value || '',
      last_name: document.getElementById('last_name')?.value || '',
      date_of_birth: document.getElementById('date_of_birth')?.value || '',
      profile_image_url: sessionStorage.getItem('profile_image_url') || '',
      location: document.getElementById('location')?.value || '',
      phone_number: document.getElementById('phone_number')?.value || '',
    };
  } else if (currentSection === 'education') {
    data = {
      country: document.getElementById('country')?.value || '',
      institution_name: document.getElementById('institution_name')?.value || '',
      degree: document.getElementById('degree')?.value || '',
      field_of_study: document.getElementById('field_of_study')?.value || '',
      start_date: document.getElementById('start_date')?.value || '',
      end_date: document.getElementById('end_date')?.value || '',
    };
  } else if (currentSection === 'work_experience') {
    data = {
      company_name: document.getElementById('company_name')?.value || '',
      job_title: document.getElementById('job_title')?.value || '',
      start_date: document.getElementById('start_date_work')?.value || '',
      end_date: document.getElementById('end_date_work')?.value || '',
      skills: document.getElementById('skills')?.value || '',
    };
  }

  // Validate data
  for (let key in data) {
    if (!data[key]) {
      document.getElementById('cv-error').textContent = 'Please fill out all fields.';
      return;
    }
  }

  sessionStorage.setItem(currentSection, JSON.stringify(data));
  document.getElementById('cv-error').textContent = '';

  // Move to the next section
  const currentSectionElement = document.getElementById(`${currentSection}-section`);
  const nextSectionElement = document.getElementById(nextSectionId);

  if (currentSectionElement) {
    currentSectionElement.style.display = 'none';
  }

  if (nextSectionElement) {
    nextSectionElement.style.display = 'block';
  }

  // Check if all sections are filled
  if (sessionStorage.getItem('personal_details') && sessionStorage.getItem('education') && sessionStorage.getItem('work_experience')) {
    document.getElementById('next-step').style.display = 'block';
  }
}

// Display selected photo and save to sessionStorage
function displaySelectedPhoto(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const profileImage = document.getElementById('profile-image');
      profileImage.src = e.target.result;
      sessionStorage.setItem('profile_image_url', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);

    // Save the photo to the server
    uploadPhoto(input.files[0]);
  }
}

// Upload photo to the server
async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append('profile_image', file);

  try {
    const response = await fetch('http://localhost:3000/api/upload_photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }

    const data = await response.json();
    console.log('Photo uploaded successfully', data);
  } catch (error) {
    document.getElementById('cv-error').textContent = 'Failed to upload photo. Please try again.';
  }
}

// Submit CV data
async function submitCV() {
  const token = sessionStorage.getItem('token');
  const user_id = sessionStorage.getItem('user_id');

  const personal_details = JSON.parse(sessionStorage.getItem('personal_details'));
  const education = [JSON.parse(sessionStorage.getItem('education'))];
  const work_experience = [JSON.parse(sessionStorage.getItem('work_experience'))];

  try {
    const response = await fetch('http://localhost:3000/api/cvs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user_id, personal_details, education, work_experience })
    });

    if (!response.ok) {
      throw new Error('Failed to submit CV');
    }

    alert('CV submitted successfully');
    sessionStorage.clear();
  } catch (error) {
    document.getElementById('cv-error').textContent = 'Failed to submit CV. Please try again.';
  }
}
//
async function uploadPhoto(file) {
    const formData = new FormData();
    formData.append('profile_image', file);
  
    try {
      const response = await fetch('http://localhost:3000/api/upload_photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }
  
      const data = await response.json();
      console.log('Photo uploaded successfully', data);
    } catch (error) {
      document.getElementById('cv-error').textContent = 'Failed to upload photo. Please try again.';
    }
  }
  function displaySelectedPhoto(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = e.target.result;
        sessionStorage.setItem('profile_image_url', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
  
      // Save the photo to the server
      uploadPhoto(input.files[0]);
    }
  }
  function openPhotoInput() {
    document.getElementById('photoInput').click();
  }
