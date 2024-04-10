console.log("Hello there!");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('countryForm');
    const countryInfo = document.getElementById('countryInfo');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const countryName = document.getElementById('countryName').value;
        const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                const foundCountry = data.find(country => country.name.common.toLowerCase() === countryName.toLowerCase());
                if (foundCountry) {
                    displayCountryInfo(foundCountry);
                } else {
                    displayError('Country not found');
                }
            } else {
                displayError('Error fetching data');
            }
        } catch (error) {
            displayError('Error fetching data');
        }
    });

    function displayCountryInfo(country) {
        countryInfo.innerHTML = `
            <div class="card">
                <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
                ${country.coatOfArms ? `<img src="${country.coatOfArms.png}" class="card-img-top" alt="Coat of Arms">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Capital: ${country.capital}</p>
                    <p class="card-text">Currency Types: ${Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ')}</p>
                    <p class="card-text">Languages: ${Object.values(country.languages).map(lang => lang).join(', ')}</p>
                </div>
            </div>
        `;
    }

    function displayError(message) {
        countryInfo.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
});
