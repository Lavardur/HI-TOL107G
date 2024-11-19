import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';
import { fetchSubIndex } from '../components/fetchData.js';
import { createSuggestionsElement } from '../components/suggestions.js';

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el('header', { class: 'd-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container' }, el('h1', { class: 'navbar me-auto' }, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  let mainElement;

  if (indexJson.navigation.find((i) => i.slug === type)) {
    const subIndexJson = await fetchSubIndex(type);
    mainElement = el('main', { class: 'flex-shrink-0 container' }, el('p', {}, subIndexJson.text));
    
    const rowElement = el('div', { class: 'row' });
    const SuggestionsElement = el('div', {}, await createSuggestionsElement('html'));
    rowElement.appendChild(SuggestionsElement);
    
    mainElement.appendChild(rowElement);

  } else {
    mainElement = el('main', { class: 'flex-shrink-0 container' }, el('p', { class: 'text-danger' }, 'EFNI ER EKKI GILT'));
  }

  const footerElement = el('footer', { class: 'footer mt-auto py-3 border-top container' }, el('p', { class: 'text-center text-body-secondary' }, indexJson.footer));

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}