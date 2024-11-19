import { renderNavigation } from '../components/navigation';
import { el } from '../elements';
import {createSuggestionsElement } from '../components/suggestions';

export async function renderIndexPage(root, indexJson) {
  console.log('rendering', root, indexJson.title);

  const headerElement = el('header', { class: 'd-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'}, el('h1', {class: 'navbar me-auto'}, indexJson.title));
  
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', { class: 'flex-shrink-0 container' });

  const rowElement = el('div', { class: 'row' });

  const htmlSuggestionsElement = el('div', { class: 'col-12 col-md-4' }, await createSuggestionsElement('HTML', 'html'));
  const cssSuggestionsElement = el('div', { class: 'col-12 col-md-4' }, await createSuggestionsElement('CSS', 'css'));
  const jsSuggestionsElement = el('div', { class: 'col-12 col-md-4' }, await createSuggestionsElement('JavaScript', 'js'));

  rowElement.appendChild(htmlSuggestionsElement);
  rowElement.appendChild(cssSuggestionsElement);
  rowElement.appendChild(jsSuggestionsElement);

  mainElement.appendChild(rowElement);

  const footerElement = el('footer', { class: 'footer mt-auto py-3 border-top' }, el('p', { class: 'text-center text-body-secondary' }, indexJson.footer));

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}

