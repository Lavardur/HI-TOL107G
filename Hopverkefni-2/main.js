import { renderSubpage } from './lib/pages/sub-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { fetchIndex } from './lib/components/fetchData.js';
import './style.scss';
 
async function render(root, querystring) {
  const indexJson = await fetchIndex();

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');
  console.log(type);
  console.log(content);


  if (!type) {
    renderIndexPage(root, indexJson);
  } else {
    renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector('#app');

render(root, window.location.search);
