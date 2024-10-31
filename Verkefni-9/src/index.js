/**
 * Gefið efni fyrir verkefni 9, ekki er krafa að nota nákvæmlega þetta en nota
 * verður gefnar staðsetningar.
 */

import { el } from './lib/elements.js';
import { weatherSearch } from './lib/weather.js';

/**
 * @typedef {Object} SearchLocation
 * @property {string} title
 * @property {number} lat
 * @property {number} lng
 */

/**
 * Allar staðsetning sem hægt er að fá veður fyrir.
 * @type Array<SearchLocation>
 */
const locations = [
  {
    title: 'Reykjavík',
    lat: 64.1355,
    lng: -21.8954,
  },
  {
    title: 'Akureyri',
    lat: 65.6835,
    lng: -18.0878,
  },
  {
    title: 'New York',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    title: 'Tokyo',
    lat: 35.6764,
    lng: 139.65,
  },
  {
    title: 'Sydney',
    lat: 33.8688,
    lng: 151.2093,
  },
];

let resultsElement;

/**
 * Hreinsar fyrri niðurstöður, passar að niðurstöður séu birtar og birtir element.
 * @param {Element} element
 */
function renderIntoResultsContent(element) {
  // Hreinsa fyrri niðurstöður
  resultsElement.innerHTML = '';

  // Gera niðurstöður sýnilegar
  resultsElement.classList.remove('hidden');

  // Bæta nýjum niðurstöðum við
  resultsElement.appendChild(element);
}

/**
 * Birtir niðurstöður í viðmóti.
 * @param {SearchLocation} location
 * @param {Array<import('./lib/weather.js').Forecast>} results
 */
function renderResults(location, results) {
  // Create a container for the results
  const resultsContainer = document.createElement('div');

  // Add a heading for the location
  const heading = document.createElement('h2');
  heading.appendChild(document.createTextNode(`Veðurspá fyrir ${location.title}`));
  resultsContainer.appendChild(heading);

  // Create the table element
  const table = document.createElement('table');
  table.classList.add('forecasts');

  // Create the table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const dateHeader = document.createElement('th');
  dateHeader.appendChild(document.createTextNode('Tími'));
  headerRow.appendChild(dateHeader);

  const descriptionHeader = document.createElement('th');
  descriptionHeader.appendChild(document.createTextNode('Lýsing'));
  headerRow.appendChild(descriptionHeader);

  const tempHeader = document.createElement('th');
  tempHeader.appendChild(document.createTextNode('Hitastig'));
  headerRow.appendChild(tempHeader);

  const precipHeader = document.createElement('th');
  precipHeader.appendChild(document.createTextNode('Úrkoma'));
  headerRow.appendChild(precipHeader);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement('tbody');

  for (const result of results) {
    const row = document.createElement('tr');

    // Format the date for better readability
    const date = new Date(result.time);
    const options = {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('is-IS', options);

    const dateCell = document.createElement('td');
    dateCell.appendChild(document.createTextNode(formattedDate));
    row.appendChild(dateCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.appendChild(document.createTextNode(result.description));
    row.appendChild(descriptionCell);

    const tempCell = document.createElement('td');
    tempCell.appendChild(document.createTextNode(`${result.temperature}°C`));
    row.appendChild(tempCell);

    const precipCell = document.createElement('td');
    precipCell.appendChild(document.createTextNode(`${result.precipitation} mm`));
    row.appendChild(precipCell);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  resultsContainer.appendChild(table);

  // Display the results
  renderIntoResultsContent(resultsContainer);
}


/**
 * Birta villu í viðmóti.
 * @param {Error} error
 */
function renderError(error) {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error');
  errorElement.appendChild(document.createTextNode(`Villa kom upp: ${error.message}`));

  renderIntoResultsContent(errorElement);
}

/**
 * Birta biðstöðu í viðmóti.
 */
function renderLoading() {
  console.log('render loading');
  const loadingElement = document.createElement('p');
  loadingElement.appendChild(document.createTextNode('Hleð veðri...'));

  renderIntoResultsContent(loadingElement);
}

/**
 * Framkvæmir leit að veðri fyrir gefna staðsetningu.
 * Birtir biðstöðu, villu eða niðurstöður í viðmóti.
 * @param {SearchLocation} location Staðsetning sem á að leita eftir.
 */
async function onSearch(location) {
  console.log('onSearch', location);

  // Birta loading state
  renderLoading();

  try {
    const results = await weatherSearch(location.lat, location.lng);
    console.log(results);

    // Birta niðurstöður
    renderResults(location, results);
  } catch (error) {
    // Birta villu
    renderError(error);
  }
}

/**
 * Framkvæmir leit að veðri fyrir núverandi staðsetningu.
 * Biður notanda um leyfi gegnum vafra.
 */
function onSearchMyLocation() {
  if (navigator.geolocation) {
    renderLoading();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const results = await weatherSearch(lat, lng);

          const location = {
            title: 'Núverandi staðsetningu',
            lat,
            lng,
          };

          renderResults(location, results);
        } catch (error) {
          renderError(error);
        }
      },
      () => {
        renderError(new Error('Ekki tókst að sækja staðsetningu'));
      },
    );
  } else {
    renderError(new Error('Vafrinn styður ekki geolocation'));
  }
}

/**
 * Býr til takka fyrir staðsetningu.
 * @param {string} locationTitle
 * @param {() => void} onSearch
 * @returns {HTMLElement}
 */
function renderLocationButton(locationTitle, onSearch) {
  // Notum `el` fallið til að búa til element og spara okkur nokkur skref.
  const locationElement = el(
    'li',
    { class: 'locations__location' },
    el(
      'button',
      { class: 'locations__button', click: onSearch },
      locationTitle,
    ),
  );

  return locationElement;
}

/**
 * Býr til grunnviðmót: haus og lýsingu, lista af staðsetningum og niðurstöður (falið í byrjun).
 * @param {Element} container HTML element sem inniheldur allt.
 * @param {Array<SearchLocation>} locations Staðsetningar sem hægt er að fá veður fyrir.
 * @param {(location: SearchLocation) => void} onSearch
 * @param {() => void} onSearchMyLocation
 */
function render(container, locations, onSearch, onSearchMyLocation) {
  // Búum til <main> og setjum `weather` class
  const parentElement = document.createElement('main');
  parentElement.classList.add('weather');

  // Búum til <header> með beinum DOM aðgerðum
  const headerElement = document.createElement('header');
  const heading = document.createElement('h1');
  heading.appendChild(document.createTextNode('Veðurspá'));
  headerElement.appendChild(heading);
  parentElement.appendChild(headerElement);

  // Útfæra inngangstexta
  const introText = document.createElement('p');
  introText.appendChild(document.createTextNode('Veldu staðsetningu til að sjá veðurspá.'));
  parentElement.appendChild(introText);

  // Búa til <div class="locations">
  const locationsElement = document.createElement('div');
  locationsElement.classList.add('locations');

  // Búa til <ul class="locations__list">
  const locationsListElement = document.createElement('ul');
  locationsListElement.classList.add('locations__list');

  // Setja locationsListElement inn í locationsElement
  locationsElement.appendChild(locationsListElement);

  // --- Add "Use current location" button first ---
  const myLocationButtonElement = renderLocationButton('Nota núverandi staðsetningu', () => {
    console.log('Using my location');
    onSearchMyLocation();
  });
  locationsListElement.appendChild(myLocationButtonElement);

  // --- Add buttons for each predefined location ---
  for (const location of locations) {
    const liButtonElement = renderLocationButton(location.title, () => {
      console.log('Halló!!', location);
      onSearch(location);
    });
    locationsListElement.appendChild(liButtonElement);
  }

  // Setja locationsElement inn í parentElement
  parentElement.appendChild(locationsElement);

  // Útfæra niðurstöðu element
  resultsElement = document.createElement('div');
  resultsElement.classList.add('results');
  resultsElement.classList.add('hidden'); // Felum í byrjun
  parentElement.appendChild(resultsElement);

  container.appendChild(parentElement);
}


// Þetta fall býr til grunnviðmót og setur það í `document.body`
render(document.body, locations, onSearch, onSearchMyLocation);
