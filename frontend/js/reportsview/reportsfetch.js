document.addEventListener('DOMContentLoaded', function() {
    // Example data
    const reports = [
        { id: 1, title: 'Annual Sales Report', date: '2024-07-01' },
        { id: 2, title: 'Quarterly Financial Review', date: '2024-06-15' },
        { id: 3, title: 'Marketing Analysis Report', date: '2024-05-20' },
    ];

    const reportList = document.getElementById('report-list');

    reports.forEach(report => {
        const listItem = document.createElement('li');
        listItem.className = 'report-item';
        listItem.innerHTML = `
            <span class="report-title">${report.title}</span>
            <span class="report-date">${report.date}</span>
            <button onclick="viewReport(${report.id})">View</button>
        `;
        reportList.appendChild(listItem);
    });
});

function viewReport(id) {
    alert('Viewing report with ID: ' + id);
}