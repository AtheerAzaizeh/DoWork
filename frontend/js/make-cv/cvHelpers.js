export function toggleSection(sectionId) {
  console.log("hello 2");
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
}

//console.log("hello");

export function saveSection(currentSection, nextSectionId) {
  let data = {};
  console("hello 13");
  if (currentSection === 'personal-details-section') {
    data = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      date_of_birth: document.getElementById('date_of_birth').value,
      profile_image_url: sessionStorage.getItem('photo') || '',
      location: document.getElementById('location').value,
      phone_number: document.getElementById('phone_number').value,
    };
  } else if (currentSection === 'education-section') {
    data = {
      country: document.getElementById('country').value,
      institution_name: document.getElementById('institution_name').value,
      degree: document.getElementById('degree').value,
      field_of_study: document.getElementById('field_of_study').value,
      start_date: document.getElementById('start_date').value,
      end_date: document.getElementById('end_date').value,
    };
  } else if (currentSection === 'work-experience-section') {
    data = {
      company_name: document.getElementById('company_name').value,
      job_title: document.getElementById('job_title').value,
      start_date: document.getElementById('start_date_work').value,
      end_date: document.getElementById('end_date_work').value,
      skills: document.getElementById('skills').value,
    };
  }
  //console.log("hello 40");
  for (let key in data) {
    if (!data[key]) {
      document.getElementById('cv-error').textContent = 'Please fill out all fields.';
      return;
    }
  }

  sessionStorage.setItem(currentSection, JSON.stringify(data));
  document.getElementById('cv-error').textContent = '';

  const currentSectionElement = document.getElementById(currentSection);
  const nextSectionElement = document.getElementById(nextSectionId);

  if (currentSectionElement) {
    currentSectionElement.style.display = 'none';
  }

  if (nextSectionElement) {
    nextSectionElement.style.display = 'block';
  }

  if (sessionStorage.getItem('personal-details-section') && sessionStorage.getItem('education-section') && sessionStorage.getItem('work-experience-section')) {
    document.getElementById('next-step').style.display = 'block';
  }
}

export async function submitCV() {
  console.log("hello 68");
  const user_id = sessionStorage.getItem('user_id');
  if (!user_id) {
      alert("User ID not found. Please log in.");
      return;
  }

  const cvData = {
      job_seeker_id: user_id,
      resume_url: sessionStorage.getItem('photo') || 'http://example.com/default_resume.pdf',
      skills: document.getElementById('skills').value ? document.getElementById('skills').value.split(',') : [],
      workExperiences: [
          {
              work_name: document.getElementById('company_name').value || null,
              start_date: document.getElementById('start_date_work').value || null,
              end_date: document.getElementById('end_date_work').value || null
          }
      ],
      education: [
          {
              academic_name: document.getElementById('institution_name').value || null,
              start_date: document.getElementById('start_date').value || null,
              end_date: document.getElementById('end_date').value || null
          }
      ]
  };

  console.log("CV data to be sent:", cvData);

  try {
      const response = await fetch('http://localhost:3000/cvs', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(cvData)
      });

      const result = await response.json();
      if (response.ok) {
          alert(result.message);
          // Redirect or other actions
          window.location.href = "jobseekerhmpg.html";
      } else {
          alert(result.message);
      }
  } catch (error) {
      console.error('Failed to submit CV:', error);
  }
}
