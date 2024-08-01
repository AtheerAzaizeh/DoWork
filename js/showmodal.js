document.getElementById('post-job-form').addEventListener('submit', function(event) {
    event.preventDefault();
    

    document.getElementById('notification-modal').style.display = 'flex';
    

    setTimeout(function() {
        document.getElementById('notification-modal').style.display = 'none';
    }, 5000);
});
