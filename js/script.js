document.addEventListener("DOMContentLoaded", function() {
    const alljobsclr = document.getElementById('alljobs');
    const jobsforyouclr = document.getElementById('jobsforyou');
    const allJobsMenu = document.getElementById("alljobsmenu");
    const jobsForYouMenu = document.getElementById("jobsforyoumenu");
    const addbutton = document.getElementById('addbutton');
    let checkerswitch = false; 

    const locations = [
        "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beersheba", 
        "Holon", "Bnei Brak", "Ramat Gan", "Ashkelon", "Rehovot", "Bat Yam", "Kfar Saba", "Herzliya", 
        "Hadera", "Modiin", "Nazareth", "Ra'anana", "Ramat Hasharon", "Raanana", "Lod", "Ramla", "Nahariya", 
        "Kiryat Ata", "Eilat", "Acre", "Rosh HaAyin", "Givatayim", "Kiryat Gat", "Kiryat Motzkin", "Nesher", 
        "Kiryat Yam", "Or Yehuda", "Yavne", "Tiberias", "Tirat Carmel", "Afula", "Migdal HaEmek", "Karmiel", 
        "Dimona", "Sderot", "Maale Adumim", "Yehud"
    ];

    initializeLocations(locations, "#locations");
    fetchAllJobs();
    alljobsclr.addEventListener('click', handleMenuSwitch);
    jobsforyouclr.addEventListener('click', handleMenuSwitch);
    addbutton.addEventListener('click', showAddJobsSection);

    function initializeLocations(locations, datalistSelector) {
        const datalist = document.querySelector(datalistSelector);
        locations.forEach(location => {
            const option = document.createElement("option");
            option.value = location;
            datalist.appendChild(option);
        });
    }

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

        li.appendChild(createArrowRight());
        li.appendChild(createDeleteButton(li));
        list.appendChild(li);
    }

    function createArrowRight() {
        const arrowRight = document.createElement('i');
        arrowRight.className = 'btnarrowright fa-solid fa-arrow-right arrow-right-icon';
        return arrowRight;
    }

    function createDeleteButton(li) {
        const deleteButton = document.createElement("i");
        deleteButton.className = "btndel fa-solid fa-trash trash-icon";
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
});
