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
  // Búa til niðurstöðuelement
  const resultsContainer = document.createElement('div');

  // Bæta við titli fyrir staðsetningu
  const heading = document.createElement('h2');
  heading.appendChild(document.createTextNode(`Veðurspá fyrir ${location.title}`));
  resultsContainer.appendChild(heading);

  // Búa til lista af veðurspám
  const forecastList = document.createElement('ul');
  forecastList.classList.add('forecasts');

  for (const result of results) {
    const item = document.createElement('li');
    item.classList.add('forecast');

    const date = document.createElement('div');
    date.classList.add('forecast__date');
    date.appendChild(document.createTextNode(result.time));

    const description = document.createElement('div');
    description.classList.add('forecast__description');
    description.appendChild(document.createTextNode(result.description));

    const temp = document.createElement('div');
    temp.classList.add('forecast__temp');
    temp.appendChild(document.createTextNode(`${result.temperature}°C`));

    item.appendChild(date);
    item.appendChild(description);
    item.appendChild(temp);

    forecastList.appendChild(item);
  }

  resultsContainer.appendChild(forecastList);

  // Birtum niðurstöður
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
