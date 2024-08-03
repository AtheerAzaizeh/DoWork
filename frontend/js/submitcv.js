document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cv-form');
    const notification = document.getElementById('cv-error'); // Assuming you have a p with id 'cv-error' for notifications

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/cvs', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                notification.textContent = result.message; // Display success message
                notification.style.color = 'green';
                form.reset(); // Optionally reset the form
            } else {
                notification.textContent = result.error; // Display error message
                notification.style.color = 'red';
            }
        } catch (error) {
            notification.textContent = 'An error occurred while saving your CV.';
            notification.style.color = 'red';
        }
    });
});

