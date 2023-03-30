const BASE_URL = 'http://localhost:8080/api/destinations';

// This function sends an HTTP POST request to the server-side code to add a new travel destination to the list.
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



const allDestinations = document.getElementById('allDestinations');
const allContinents = document.getElementById('allContinents');
const destinationById = document.getElementById('destinationById');
const getAllDestinationsButton = document.getElementById('getAllDestinations');
const getAllContinentsButton = document.getElementById('getAllContinents');
const getDestinationByIdButton = document.getElementById('getDestinationById');

// This function sends an HTTP GET request to retrieve all travel destinations from the server-side code and displays them on the web page.
const BASE_URL_GET = 'http://localhost:8080/api';
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

getAllContinentsButton.addEventListener('click', getAllContinents);

// This function sends an HTTP GET request to retrieve all travel destinations by continent from the server-side code and displays them on the web page.
function getAllContinents(event) {
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


