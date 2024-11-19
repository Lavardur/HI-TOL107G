import { el } from "../elements.js";
import { fetchData } from "./fetchData.js";


export async function createSuggestionsElement(title, type) {
  const data = await fetchData(type);
  const suggestionsElement = el(
    "div",
    { class: "my-3 p-3 bg-body rounded shadow-sm" },
    el("h6", { class: "border-bottom pb-2 mb-0" }, title),
    ...data.content.map((item) => createSuggestionItem(item.title, item.text))
  );

  return suggestionsElement;
}

function createSuggestionItem(name, keyword) {
  return el(
    "div",
    { class: "d-flex text-body-secondary pt-3" },
    el(
      "div",
      { class: "pb-3 mb-0 small lh-sm border-bottom w-100" },
      el(
        "div",
        { class: "d-flex justify-content-between" },
        el("strong", { class: "text-gray-dark" }, name)
      ),
      el(
        "span",
        { class: "d-block" },
        el("a", { href: `#${keyword}` }, keyword)
      )
    )
  );
}
