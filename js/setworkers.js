document.addEventListener("DOMContentLoaded", () => {
    fetch('data/workers.json')
        .then(response => response.json())
        .then(data => {
            const workersList = document.querySelector('.workers-list');
            const modal = document.getElementById('cv-modal');
            const closeModal = document.querySelector('.modal .close');
            const cvFrame = document.getElementById('cv-frame');

            data.workers.forEach(worker => {
                const workerDiv = document.createElement('div');
                workerDiv.classList.add('worker');
                workerDiv.innerHTML = `
                    <div class="worker-info">
                        <img src="${worker.image}" alt="${worker.name}">
                        <span>${worker.name}</span>
                        <span>Age: ${worker.age} yo</span>
                        <span>Occupation: ${worker.occupation}</span>
                        <span>Years of exp: ${worker.experience}</span>
                        <span>Location: ${worker.location}</span>
                        <span>Percentage: ${worker.percentage}%</span>
                    </div>
                    <i class="fa-solid fa-file" data-cv="${worker.cv}"></i>
                `;
                workersList.appendChild(workerDiv);
            });

            workersList.addEventListener('click', event => {
                if (event.target.classList.contains('fa-file')) {
                    const cvData = event.target.getAttribute('data-cv');
                    cvFrame.src = cvData;
                    modal.style.display = 'block';
                    document.body.classList.add('modal-open');
                }
            });

            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                cvFrame.src = '';
                document.body.classList.remove('modal-open');
            });

            window.addEventListener('click', event => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    cvFrame.src = '';
                    document.body.classList.remove('modal-open');
                }
            });
        })
        .catch(error => console.error('Error fetching the workers data:', error));
});
