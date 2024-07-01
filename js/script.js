document.addEventListener("DOMContentLoaded", function() {
    const alljobsclr = document.getElementById('alljobs');
    const jobsforyouclr = document.getElementById('jobsforyou');
    const allJobsMenu = document.getElementById("alljobsmenu");
    const jobsForYouMenu = document.getElementById("jobsforyoumenu");
    const addbutton = document.getElementById('addbutton');
    const arrowleft = document.getElementById('arrowleft');
    let checkerswitch = false; 

    function fetchJobsForYou() {
        fetchData('data/jobs.json', (data) => {
            renderJobs(data.jobsforyou, jobsForYouMenu);
        });
    }

    function fetchAllJobs() {
        fetchData('data/jobs.json', (data) => {
            renderJobs(data.alljobs, allJobsMenu);
        });
    }

    function fetchData(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data);
            });
    }

    function renderJobs(jobs, menu) {
        menu.innerHTML = '';
        jobs.forEach(job => {
            addItemToDOM(job, menu);
        });
    }

    function addItemToDOM(item, list) {
        const li = document.createElement("li");
        li.setAttribute("data-id", item.id);
        li.textContent = item.title;

        li.appendChild(createArrowRight(item));
        li.appendChild(createDeleteButton(li));
        list.appendChild(li);
    }

    function createArrowRight(job) {
        const arrowRight = document.createElement('i');
        arrowRight.className = 'btnarrowright fas fa-arrow-right arrow-right-icon';
        arrowRight.addEventListener('click', function() {
            showJobDetails(job);
        });
        return arrowRight;
    }

    function createDeleteButton(li) {
        const deleteButton = document.createElement("i");
        deleteButton.className = "btndel fa-solid fa-trash trash-icon";
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener("click", function() {
            li.remove();
        });
        return deleteButton;
    }

    function handleMenuSwitch(event) {
        const targetId = event.target.id;

        if ((!checkerswitch && targetId === 'alljobs') || (checkerswitch && targetId === 'jobsforyou')) {
            return;
        }
        toggleMenuDisplay(checkerswitch);   
        checkerswitch = !checkerswitch;
    }

    function toggleMenuDisplay(isAllJobs) {
        if (isAllJobs) {
            setActiveMenu(alljobsclr, jobsforyouclr, allJobsMenu, jobsForYouMenu);
            fetchAllJobs();
        } else {
            setActiveMenu(jobsforyouclr, alljobsclr, jobsForYouMenu, allJobsMenu);
            fetchJobsForYou();
        }
    }

    function setActiveMenu(activeButton, inactiveButton, activeMenu, inactiveMenu) {
        activeButton.style.backgroundColor = '#20C997';
        inactiveButton.style.backgroundColor = 'white';
        activeMenu.style.display = 'block';
        inactiveMenu.style.display = 'none';
    }

    function showAddJobsSection() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.getElementById('addjobs');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
    
    function returnback(event) {
        const targetId = event.target.id;
        const sections = document.querySelectorAll('section');
        const activesection = document.getElementById('addjobs');
        if (targetId === 'arrowleft') {
            sections.forEach(section => {
                section.style.display = '';
            });
            activesection.style.display = 'none';
        }
    }
    function showJobDetails(job) {
        const jobTitle = document.getElementById("titlethejob");
        const timeAgo = document.getElementById("timeago");
        const LocationSalary = document.getElementById("location-salary");
        const Location = LocationSalary.querySelector('#location');
        const salary = LocationSalary.lastChild;
        const explanation = document.getElementById("explanjob");
        const requirements = document.getElementById('requirements');
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            section.style.display = 'none';
        });
        jobTitle.textContent = job.title;
        timeAgo.textContent = job.timeago;
        Location.textContent = job.location; 
        salary.textContent = `Salary: ${job.salary}`;
        explanation.innerHTML = `Position Overview: <br>${job.description}`;
        requirements.innerHTML = `Requirements:<br>${job.requirements}`;
        jobDetailsSection.style.display = 'block';
        arrowleft.style.display = '';
    }
});
