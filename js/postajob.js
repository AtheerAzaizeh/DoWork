document.getElementById('post-job-form').addEventListener('submit', function(event) {
    var checkboxes = document.querySelectorAll('input[name="work-type"]');
    var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    
    if (!checkedOne) {
        alert('Please select at least one type of work.');
        event.preventDefault();
    }
});