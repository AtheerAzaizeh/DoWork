export function fetchCities() {
    const locationSelect = document.getElementById('location');
  
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: 'Israel' })
    })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                data.data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    locationSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error:', error.message));
  }
  
  export function fetchCountries() {
    const countrySelect = document.getElementById('country');
  
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error.message));
  }
  
 export function fetchUniversities() {
  const countrySelect = document.getElementById('country');
  const universitySelect = document.getElementById('institution_name');
  
  countrySelect.addEventListener('change', () => {
    const selectedCountry = countrySelect.value;
    universitySelect.innerHTML = '';

    fetch(`https://onlybackend-wgcr.onrender.com/api/universities/search?country=${encodeURIComponent(selectedCountry)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(universities => {
        universities.forEach(university => {
          const option = document.createElement('option');
          option.value = university.name;
          option.textContent = university.name;
          universitySelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching universities:', error.message);
      });
  });
}
  
