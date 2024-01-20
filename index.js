//       const btn = document.querySelector("#btn");
const addData = document.querySelector("#getdata");
const countrySelector = document.querySelector("#countrySelector");

// Fetch all country names
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        // Populate the country selector with options
        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelector.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching countries:', error));

btn.addEventListener("click", () => {
    const selectedCountryName = countrySelector.value;

    if (selectedCountryName) {
        // Fetch data for the selected country
        const countryDataPromise = fetch(`https://restcountries.com/v3.1/name/${selectedCountryName}?fullText=true`)
            .then(response => response.json())
            .then(data => data[0])
            .catch(error => {
                console.error('Error fetching country data:', error);
                throw new Error('Invalid Request');
            });

        // Display country data
        countryDataPromise.then(country => {
            console.log(country);
            addData.innerHTML = `<h2>${country.name.common}</h2><img src="${country.flags.png}" alt="Flag of ${country.name.common}">`;
        }).catch(error => {
            console.error(error);
            addData.innerHTML = `<h2>${error}</h2>`;
        });
    } else {
        addData.innerHTML = '<h2>Please select a country</h2>';
    }
});