import { renderSubpage } from './lib/pages/sub-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderKeywordsPage } from './lib/pages/keywords-page.js';
import { renderLecturesPage } from './lib/pages/lectures-page.js';
import { renderQuestionsPage } from './lib/pages/questions-page.js';
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
    await renderIndexPage(root, indexJson);
  } else if (content === 'keywords') {
    await renderKeywordsPage(root, indexJson, type, content);
  } else if (content === 'lectures') {
    await renderLecturesPage(root, indexJson, type, content);
  } else if (content === 'questions') {
    await renderQuestionsPage(root, indexJson, type, content);
  } else {
    await renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector('#app');

render(root, window.location.search);
