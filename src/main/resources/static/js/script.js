const BASE_URL = 'http://localhost:8080/api/destinations';
const BASE_URL_GET = 'http://localhost:8080/api';
const DESTINATION_IDS_URL = 'http://localhost:8080/api/allDestinations';

const addDestinationButton = document.getElementById('addDestinationButton');
const allDestinations = document.getElementById('allDestinations');
const allContinents = document.getElementById('allContinents');
const destinationById = document.getElementById('destinationById');
const getAllDestinationsButton = document.getElementById('getAllDestinations');
const getDestinationByContinentButton = document.getElementById('getDestinationByContinent');
const getDestinationByIdButton = document.getElementById('getDestinationById');
const continentSelect = document.getElementById('continentSelect');
const getAllDestinationsJsonFormatButton = document.getElementById('getAllDestinationsJsonFormat');
const getDestinationByContinentJSONFormatButton = document.getElementById('getDestinationByContinentJsonFormat');
const getDestinationByIdButtonJsonFormat = document.getElementById('getDestinationByIdButtonJsonFormat');

// This function sends an HTTP POST request to the server-side code to add a new travel destination to the list.
addDestinationButton.addEventListener('click', addDestination);
function addDestination(event) {
    event.preventDefault();
    const continent = document.getElementById('continent').value;
    const destination = document.getElementById('destination').value;
    const data = { continent, destination };
    console.log("Data to send:", data);

    fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(destination => {
            const destinationDiv = document.createElement('div');
            destinationDiv.innerHTML = `
                        <h3>${destination.continent} - ${destination.destination}</h3>
                    `;
            allDestinations.appendChild(destinationDiv);
        })
        .catch(error => console.error(error));
}

// This function sends an HTTP GET request to retrieve all travel destinations from the server-side code and displays them on the web page.
getAllDestinationsButton.addEventListener('click', getAllDestinations);
function getAllDestinations(event) {
    event.preventDefault();

    allContinents.innerHTML = '';
    destinationById.innerHTML = '';

    fetch(`${BASE_URL_GET}/allDestinations`)
        .then(response => response.json())
        .then(destinations => {
            allDestinations.innerHTML = '';
            destinations.forEach(destination => {
                const destinationDiv = document.createElement('div');
                destinationDiv.innerHTML = `
                              <h3>${destination.continent} - ${destination.destination}</h3>
                          `;
                allDestinations.appendChild(destinationDiv);
            });
        })
        .catch(error => console.error(error));
}

//This function opens a new tab with the JSON response from the "/api/allDestinations" endpoint
getAllDestinationsJsonFormatButton.addEventListener("click", getAllDestinationsJsonFormat);
function getAllDestinationsJsonFormat(event) {
    event.preventDefault();
    const url = 'http://localhost:8080/api/allDestinations';
    window.open(url, '_blank');
}


getDestinationByContinentButton.addEventListener('click', getDestinationByContinent);

// This function sends an HTTP GET request to retrieve all travel destinations by continent from the server-side code and displays them on the web page.
function getDestinationByContinent(event) {
    event.preventDefault();

    allDestinations.innerHTML = '';
    destinationById.innerHTML = '';

    const continent = document.getElementById('continents').value;
    fetch(`${BASE_URL_GET}/continent/${continent}`)
        .then(response => response.json())
        .then(destinations => {
            allContinents.innerHTML = '';
            const continentDestinations = destinations.filter(destination => destination.continent === continent);
            for (let i = 0; i < continentDestinations.length; i++) {
                const destination = continentDestinations[i];
                const continentDiv = document.createElement('div');
                continentDiv.innerHTML = `<h3>${destination.continent}</h3> 
                <p>Destination: ${destination.destination}</p>
                <p>Id:${destination.id}</p> `;
                allContinents.appendChild(continentDiv);
            }
        })
        .catch(error => console.error(error));

}

fetch('http://localhost:8080/api/allDestinations')
    .then(response => response.json())
    .then(data => {
        const continents = [...new Set(data.map(dest => dest.continent))]; // get unique continents from JSON data
        const options = continents.map(continent => `<option value="${continent}">${continent}</option>`).join('');
        continentSelect.innerHTML = options;
    })
    .catch(error => console.error(error));


//This function opens a new tab with the JSON response from the "/api/continent/{continent}" endpoint
getDestinationByContinentJSONFormatButton.addEventListener('click', () => {
    const selectedContinent = continentSelect.value;
    const url = `http://localhost:8080/api/continent/${selectedContinent}`;
    window.open(`${url}`, '_blank');
});


// This function sends an HTTP GET request to retrieve a single travel destination by its ID from the server-side code and displays it on the web page.
getDestinationByIdButton.addEventListener('click', getDestinationById);
function getDestinationById(event) {
    event.preventDefault();

    allDestinations.innerHTML = '';
    allContinents.innerHTML = '';

    const destinationId = document.getElementById('destinationId').value;
    fetch(`${BASE_URL_GET}/${destinationId}`)
        .then(response => response.json())
        .then(destination => {
            destinationById.innerHTML = '';
            const destinationDiv = document.createElement('div');
            destinationDiv.innerHTML = `
                          <h3>${destination.continent} - ${destination.destination}</h3>
                      `;
            destinationById.appendChild(destinationDiv);
        })
        .catch(error => console.error(error));

}

loadDestinationIds();

function loadDestinationIds() {
    fetch(DESTINATION_IDS_URL)
        .then(response => response.json())
        .then(data => {
            const destinationIdSelect = document.getElementById('destinationIdInJsonFormat');
            data.forEach(destination => {
                const option = document.createElement('option');
                option.value = destination.id;
                option.textContent = destination.id;
                destinationIdSelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

getDestinationByIdButtonJsonFormat.addEventListener('click', getDestinationByIdJsonFormat);


//This function opens a new tab with the JSON response from the "/api/{destinationId}" endpoint
function getDestinationByIdJsonFormat(event) {
    event.preventDefault();

    const selectedId = document.getElementById('destinationIdInJsonFormat').value;
    if (!selectedId) {
        return;
    }

    const url = `${BASE_URL_GET}/${selectedId}`;
    window.open(url, '_blank');
}