document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        submitButton.textContent = 'Loading...';
        submitButton.disabled = true;

        setTimeout(function() {
            submitButton.textContent = 'Saved';
            submitButton.disabled = false;

            setTimeout(function() {
                window.location.href = 'workerslist.html';
            }, 2000);
        }, 2000);
    });
});
