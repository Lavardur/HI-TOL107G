import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetchSubData } from "../components/fetchData.js";
import { createSuggestionsElement } from "../components/suggestions.js";

function createLectureItem(lecture) {
  return el(
    'div',
    { class: 'my-3 p-3 bg-body rounded shadow-sm' },
    el('h5', { class: 'border-bottom pb-2 mb-0' }, lecture.title),
    ...lecture.content.map(contentItem => {
      switch (contentItem.type) {
        case 'quote':
          return el('blockquote', {}, el('p', {}, contentItem.data), contentItem.attribute ? el('footer', {}, contentItem.attribute) : null);
        case 'text':
          return el('p', {}, contentItem.data);
        case 'heading':
          return el('h3', {}, contentItem.data);
        case 'list':
          return el('ul', {}, ...contentItem.data.map(item => el('li', {}, item)));
        case 'code':
          return el('pre', {}, el('code', {}, contentItem.data));
        default:
          return null;
      }
    })
  );
}

export async function renderLecturesPage(root, indexJson, type, content) {
  console.log("rendering lectures", root, indexJson.title);

  const headerElement = el(
    "header",
    {
      class:
        "d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container",
    },
    el("h1", { class: "navbar me-auto" }, indexJson.title)
  );
  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  let mainElement;

  if (indexJson.navigation.find((i) => i.slug === type)) {
    const subIndexJson = await fetchSubData(type, content);
    mainElement = el('main', { class: 'flex-shrink-0 container' },
        el('h2', {}, subIndexJson.title),
        el('div', {},
          ...subIndexJson.lectures.map(createLectureItem)
        )
      );

    const rowElement = el("div", { class: "row" });
    const SuggestionsElement = el(
      "div",
      {},
      await createSuggestionsElement(type)
    );
    rowElement.appendChild(SuggestionsElement);

    mainElement.appendChild(rowElement);
  } else {
    mainElement = el(
      "main",
      { class: "flex-shrink-0 container" },
      el("p", { class: "text-danger" }, "EFNI ER EKKI GILT")
    );
  }

  const footerElement = el(
    "footer",
    { class: "footer mt-auto py-3 border-top container" },
    el("p", { class: "text-center text-body-secondary" }, indexJson.footer)
  );

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}