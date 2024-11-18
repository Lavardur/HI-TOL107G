import { renderNavigation } from '../components/navigation';
import { el } from '../elements';

async function fetchData(type) {
  const file = `public/data/${type}/index.json`;
  const response = await fetch(file); 
  const json = await response.json();
  return json;
}

export async function createSuggestionsElement(title, type) {
  const data = await fetchData(type);
  const suggestionsElement = el(
    'div',
    { class: 'my-3 p-3 bg-body rounded shadow-sm' },
    el('h6', { class: 'border-bottom pb-2 mb-0' }, title),
    ...data.content.map(item => createSuggestionItem(item.title, item.text))
  );

  return suggestionsElement;
}

function createSuggestionItem(name, keyword) {
  return el(
    'div',
    { class: 'd-flex text-body-secondary pt-3' },
    el(
      'div',
      { class: 'pb-3 mb-0 small lh-sm border-bottom w-100' },
      el(
        'div',
        { class: 'd-flex justify-content-between' },
        el('strong', { class: 'text-gray-dark' }, name)
      ),
      el('span', { class: 'd-block' }, el('a', { href: `#${keyword}` }, keyword))
    )
  );
}

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

