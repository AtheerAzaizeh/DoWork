document.addEventListener('DOMContentLoaded', function () {
    const searchHelpInput = document.getElementById('search-help-input');
    const searchHelpNotes = document.getElementById('search-help-notes');

    if (searchHelpInput && searchHelpNotes) {
        searchHelpInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase();
                let note = '';
                let button = '';
                switch (query) {
                    case 'i want to post a job':
                    case 'how to post a job':
                    case 'post a job':
                        note = 'You can post a job on the Post a Job page.';
                        button = '<button onclick="window.location.href=\'postajob.html\'">Post a Job</button>';
                        break;
                    case 'i am looking for a worker':
                    case 'find workers':
                    case 'discover workers':
                    case 'workers':
                    case 'im looking for a worker':
                        note = 'You can find workers on the Workers List page.';
                        button = '<button onclick="window.location.href=\'workerslist.html\'">Find Workers</button>';
                        break;
                    case 'i want to set an interview':
                    case 'schedule an interview':
                    case 'job interview':
                    case 'interview':
                        note = 'You can set up a job interview on the Set Interview page.';
                        button = '<button onclick="window.location.href=\'setinterview.html\'">Set an Interview</button>';
                        break;
                    // Add more cases as needed
                    default:
                        note = 'No results available for "' + query + '"';
                        button = '';
                        break;
                }

                searchHelpNotes.innerHTML = `<p>${note}</p>${button}`;
            }
        });
    } else {
        console.error('Search help input or notes element not found'); // Debug log
    }
});
