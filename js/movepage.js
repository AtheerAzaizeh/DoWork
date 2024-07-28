document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and DOM fully parsed');
    
    document.getElementById('post-job').addEventListener('click', function() {
        window.location.href = 'postajob.html';
    });
    
    document.getElementById('interview').addEventListener('click', function() {
        window.location.href = 'setinterview.html';
    });
    
    document.getElementById('workers').addEventListener('click', function() {
        window.location.href = 'workerslist.html';
    });

});

