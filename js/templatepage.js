document.addEventListener('DOMContentLoaded', function () {
    
    const useTemplateBtn = document.getElementById('useTemplateBtn');
    loadStoredData();

    function loadStoredData() {
        const storedPhoto = localStorage.getItem("cv_photo");
        const storedName = localStorage.getItem("cv_name");
        const storedEmail = localStorage.getItem("cv_email");
        const storedLocation = localStorage.getItem("cv_location");
        const storedPhone = localStorage.getItem("cv_phoneNumber");
        const resumeObjective = getFromLocalStorage('resumeObjective');
        const education = getFromLocalStorage('educationQualification');
        const skills = getFromLocalStorage('skills');
        const experience = getFromLocalStorage('workExperience');

        if (storedPhoto) {
            const photoPlaceholder = document.getElementById("photoPlaceholder");
            photoPlaceholder.src = storedPhoto;
        }

        if (storedName) {
            const nameInput = document.getElementById("nameInput");
            nameInput.textContent = storedName;
        }

        if (storedLocation) {
            const locationInput = document.getElementById("locationInput");
            locationInput.textContent = storedLocation;
        }

        if (storedPhone) {
            const phoneNumber = document.getElementById("phoneNumber");
            phoneNumber.textContent = storedPhone;
        }

        if (storedEmail) {
            const emailInput = document.getElementById("emailInput");
            emailInput.textContent = storedEmail;
        }

        document.getElementById('resumeOdjectiveContent').textContent = resumeObjective || '';
        document.getElementById('educationContent').textContent = education || '';
        
        if (skills) {
            const skillsList = document.getElementById('skillsList');
            skills.split(',').forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim();
                skillsList.appendChild(li);
            });
        }
        
        document.getElementById('experienceContent').textContent = experience || '';
    }

    function getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
    useTemplateBtn.addEventListener('click', function() {
        alert('Your CV was sent to your email!');
    });
});
