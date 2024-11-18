import { renderNavigation } from './lib/components/navigation.js';
import { el } from './lib/elements.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import './style.scss';
 
async function fetchIndex() {
  const file = 'public/data/index.json';

  const response = await fetch(file); 
  const json = await response.json();

  return json;
}

async function fetchSubIndex(type) {
  const file = `public/data/${type}/index.json`;

  const response = await fetch(file); 
  const json = await response.json();

  return json;
}


async function renderSubpage(root, indexJson, type) {

  

  const headerElement = el('header', {class: 'd-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'}, el('h1', {class: 'me-auto'}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  let contentString = 'EFNI ER EKKI GILT';

  if (indexJson.navigation.find((i) => i.slug === type)) {
    contentString = type;
  }

  const subIndexJson = await fetchSubIndex(type);

  const mainElement = el('main', {class: 'flex-shrink-0'}, el('p', {}, subIndexJson.text));

  const footerElement = el('footer', {class: 'footer mt-auto py-3 border-top'},el('p', {class: 'text-center text-body-secondary'}, indexJson.footer) );

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}

async function render(root, querystring) {
  const indexJson = await fetchIndex();

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  console.log(type);

  if (!type) {
    renderIndexPage(root, indexJson);
  } else {
    renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector('#app');

render(root, window.location.search);
