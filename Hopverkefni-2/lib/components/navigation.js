import { el } from "../elements.js";

export function renderNavigation(navigation, activeSlug = "") {
  const navigationElement = el("ul", { class: "nav nav-pills" });

  navigation.forEach((item) => {
    const { title, slug } = item;
    const href = `/?type=${slug}`;
    const navLinkClass = slug === activeSlug ? "nav-link active" : "nav-link"; // Add 'active' class if slug matches activeSlug
    const navItemElement = el(
      "li",
      { class: "nav-item" },
      el("a", { href, class: navLinkClass }, title)
    );
    navigationElement.appendChild(navItemElement);
  });

  return el("nav", { class: "navbar" }, navigationElement);
}
