document.addEventListener('DOMContentLoaded', function() {
    // Theme switching
    const themeSwitch = document.getElementById('themeSwitch');
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
    });

    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    // Function to fetch countries for all regions
    function fetchAllCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                populateCountryCards(data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }

    // Function to fetch countries based on a region
    function fetchCountriesByRegion(region) {
        if (region === 'Region') {
            fetchAllCountries(); // Fetch all countries if 'Region' is selected
        } else {
            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => response.json())
                .then(data => {
                    populateCountryCards(data);
                })
                .catch(error => {
                    console.error('Error fetching countries:', error);
                });
        }
    }

    // Function to populate country cards
    function populateCountryCards(countries) {
        const countriesList = document.getElementById('countriesList');
        countriesList.innerHTML = ''; // Clear previous cards

        countries.forEach(country => {
            const countryCard = `
                <div class="country-card">
                    <img class="country-img" src="${country.flags.png}" alt="Flag of ${country.name.common}">
                    <div class="country-card-block">
                        <h2 class="country-card-title">${country.name.common}</h2>
                        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                        <div class="block"><p><b>Region:</b> ${country.region}</p></div>
                        <p><b>Capital:</b> ${country.capital}</p>
                    </div>
                </div>
            `;
            countriesList.innerHTML += countryCard;
        });
    }

    // Function to filter countries by name
    function filterCountriesByName(searchText) {
        const countryCards = document.querySelectorAll('.country-card');
        countryCards.forEach(card => {
            const countryName = card.querySelector('.country-card-title').textContent.toLowerCase();
            if (countryName.includes(searchText.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initial call to fetch all countries by default
    fetchAllCountries();

    // Region filter to fetch countries based on selected region
    const regionFilter = document.getElementById('regionFilter');
    regionFilter.addEventListener('change', function() {
        const selectedRegion = this.value;
        fetchCountriesByRegion(selectedRegion);
    });

    // Attach event listener to the search input for filtering countries by name
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchText = this.value;
        if (!searchText) {
            // If search text is empty, display all country cards
            const countryCards = document.querySelectorAll('.country-card');
            countryCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // Otherwise, filter country cards by name
            filterCountriesByName(searchText);
        }
    });
});
