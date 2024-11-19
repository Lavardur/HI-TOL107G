import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';
import { fetchSubIndex } from '../components/fetchData.js';

export async function renderSubpage(root, indexJson, type) {
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