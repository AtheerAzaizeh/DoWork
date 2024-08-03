document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            console.log('Key pressed:', e.key); // Debug log
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase();
                console.log('Search query:', query); // Debug log
                switch (query) {
                    case 'post a job':
                    case 'post job':
                    case 'postajob':
                        window.location.href = 'postajob.html';
                        break;
                    case 'discover workers':
                    case 'looking for a worker':
                    case 'workers':
                    case 'worker':
                        window.location.href = 'workerslist.html';
                        break;
                    case 'job interview':
                    case 'interview':
                        window.location.href = 'setinterview.html';
                        break;
                    case 'all reports':
                    case 'reports':
                        window.location.href = 'all-reports.html';
                        break;
                    case 'delete reports':
                    case 'remove reports':
                        window.location.href = 'deletereports.html';
                        break;
                    case 'in progress reports':
                    case 'ongoing reports':
                        window.location.href = 'inprogressreports.html';
                        break;
                    case 'current reports':
                    case 'active reports':
                        window.location.href = 'currentreports.html';
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No results found for "' + query + '"',
                        });
                        break;
                }
            }
        });
    } else {
        console.error('Search input element not found');
    }
});


