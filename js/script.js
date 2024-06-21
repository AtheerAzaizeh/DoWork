document.addEventListener("DOMContentLoaded", function() {
    const alljobsclr = document.getElementById('alljobs');
    const jobsforyouclr = document.getElementById('jobsforyou');
    const allJobsMenu = document.getElementById("alljobsmenu");
    const jobsForYouMenu = document.getElementById("jobsforyoumenu");
    let checkerswitch = true; 

    function fetchJobsForYou() {
        fetch('data/jobs.json')
            .then(response => response.json())
            .then(data => {
                jobsForYouMenu.innerHTML = '';
                data.jobsforyou.forEach(item => {
                    addItemToDOM(item, jobsForYouMenu);
                });
            });
    }

    function fetchAllJobs() {
        fetch('data/jobs.json')
            .then(response => response.json())
            .then(data => {   
                allJobsMenu.innerHTML = '';
                data.alljobs.forEach(item => {
                    addItemToDOM(item, allJobsMenu);
                });
            });
    }

    function addItemToDOM(item, list) {
        const li = document.createElement("li");
        li.setAttribute("data-id", item.id);
        li.textContent = item.title;

        const deleteButton = document.createElement("i");
        deleteButton.className = "btndel";
        deleteButton.classList.add("fa-solid", "fa-trash", "trash-icon");
        deleteButton.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);
    }

   
    function handleMenuSwitch() {
        if (checkerswitch) {
            alljobsclr.style.backgroundColor = '#20C997';
            jobsforyouclr.style.backgroundColor = 'white';
            jobsForYouMenu.style.display = 'none'; 
            allJobsMenu.style.display = 'block'; 
            fetchAllJobs();
        } if(!checkerswitch) {
            alljobsclr.style.backgroundColor = 'white';
            jobsforyouclr.style.backgroundColor = '#20C997';
            jobsForYouMenu.style.display = 'block'; 
            allJobsMenu.style.display = 'none'; 
            fetchJobsForYou();
        }
        checkerswitch = !checkerswitch; 
    }

    fetchAllJobs();

    alljobsclr.addEventListener('click', handleMenuSwitch);
    jobsforyouclr.addEventListener('click', handleMenuSwitch);
});
