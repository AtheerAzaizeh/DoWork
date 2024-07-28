
    document.addEventListener("DOMContentLoaded", function() {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(data => {
                const locationSelect = document.getElementById('location');
                
                locationSelect.innerHTML = '<option value="" disabled selected>Select Location</option>';

                data.locations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    locationSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching locations:', error));
    });


