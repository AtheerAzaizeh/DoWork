document.addEventListener('DOMContentLoaded', (event) => {
    const profile = document.querySelector('.profile');
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown-menu');
    dropdown.innerHTML = `
        <a href="#">Profile</a>
        <a href="#">Logout</a>
    `;
    profile.appendChild(dropdown);

    profile.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
        if (!profile.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    });
