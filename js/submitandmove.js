document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        submitButton.textContent = 'Loading...';
        submitButton.disabled = true;

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const agencyName = document.getElementById('agency-name').value;
        const workType = document.querySelector('input[name="work-type"]:checked').value;
        const location = document.getElementById('location').value;
        const yearsOfExp = document.getElementById('years-of-exp').value;
        const education = document.getElementById('education').value;
        const skills = document.getElementById('skills').value;
        const workTime = document.querySelector('input[name="work-time"]:checked').value;

        const postData = {
            firstName,
            lastName,
            email,
            mobile,
            agencyName,
            workType,
            location,
            yearsOfExp,
            education,
            skills,
            workTime
        };

        fetch('https://onlybackend-wgcr.onrender.com/api/workers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            submitButton.textContent = 'Saved';
            submitButton.disabled = false;

            setTimeout(function() {
                window.location.href = 'workerslist.html';
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error.message);
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
        });
    });
});
