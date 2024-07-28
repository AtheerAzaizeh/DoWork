export function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }
  }
  
  export function saveSection(currentSection, nextSectionId) {
    let data = {};
  
    if (currentSection === 'personal_details-section') {
        data = {
            first_name: document.getElementById('first_name')?.value || '',
            last_name: document.getElementById('last_name')?.value || '',
            date_of_birth: document.getElementById('date_of_birth')?.value || '',
            profile_image_url: sessionStorage.getItem('photo') || '',
            location: document.getElementById('location')?.value || '',
            phone_number: document.getElementById('phone_number')?.value || '',
        };
    } else if (currentSection === 'education-section') {
        data = {
            country: document.getElementById('country')?.value || '',
            institution_name: document.getElementById('institution_name')?.value || '',
            degree: document.getElementById('degree')?.value || '',
            field_of_study: document.getElementById('field_of_study')?.value || '',
            start_date: document.getElementById('start_date')?.value || '',
            end_date: document.getElementById('end_date')?.value || '',
        };
    } else if (currentSection === 'work_experience-section') {
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
    const currentSectionElement = document.getElementById(currentSection);
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
  
  export async function submitCV() {
    const token = sessionStorage.getItem('token');
    const user_id = sessionStorage.getItem('user_id');
  
    const personal_details = JSON.parse(sessionStorage.getItem('personal_details-section'));
    const education = [JSON.parse(sessionStorage.getItem('education-section'))];
    const work_experience = [JSON.parse(sessionStorage.getItem('work_experience-section'))];
    const photo = sessionStorage.getItem('photo'); 
  
    if (!personal_details.first_name || !personal_details.last_name) {
      document.getElementById('cv-error').textContent = 'First name and last name are required.';
      return;
    }
    const data = {
      user_id,
      personal_details,
      education,
      work_experience,
      photo
    };
  
    try {
        const response = await fetch('https://onlybackend-wgcr.onrender.com/api/cvs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
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
  
  