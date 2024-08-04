document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location');
    const locationList = document.getElementById('location-list');

    // Fetch locations from the JSON file
    fetch('locations.json')
        .then(response => response.json())
        .then(data => {
            // Clear the existing list items if any
            locationList.innerHTML = '';

            // Populate the dropdown list with fetched data
            data.forEach(location => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = location;
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    locationInput.value = location; // Set the input value to the selected location
                    locationList.style.display = 'none'; // Hide the list after selection
                });
                listItem.appendChild(link);
                locationList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading locations:', error));

    // Show the list when the input is clicked
    locationInput.addEventListener('focus', (event) => {
        locationList.style.display = 'block'; // Show the list
        event.stopPropagation(); // Prevent click from closing the list
    });

    // Hide the location list when clicking outside
    document.addEventListener('click', (event) => {
        if (!locationInput.contains(event.target) && !locationList.contains(event.target)) {
            locationList.style.display = 'none';
        }
    });
});



