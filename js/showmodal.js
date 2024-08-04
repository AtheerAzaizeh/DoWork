document.getElementById('post-job-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Show the modal
    document.getElementById('notification-modal').style.display = 'flex';
    
    // Optional: Hide the modal after a certain time, e.g., 5 seconds
    setTimeout(function() {
        document.getElementById('notification-modal').style.display = 'none';
    }, 5000); // 5000 milliseconds = 5 seconds
});
