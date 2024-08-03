document.addEventListener('DOMContentLoaded', function() {
    const modals = {
        'all-reports-button': 'all-reports-modal',
        'delete-reports-button': 'delete-reports-modal',
        'in-progress-reports-button': 'in-progress-reports-modal',
        'current-reports-button': 'current-reports-modal'
    };

    Object.keys(modals).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        const modalId = modals[buttonId];
        const modal = document.getElementById(modalId);
        const closeButton = modal.querySelector('.close-button');

        button.addEventListener('click', function() {
            modal.style.display = 'block';
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
