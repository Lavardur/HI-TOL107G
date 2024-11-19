export async function fetchData(type) {
  const file = `public/data/${type}/index.json`;
  const response = await fetch(file);
  const json = await response.json();
  return json;
}

export async function fetchIndex() {
  const file = "public/data/index.json";

  const response = await fetch(file);
  const json = await response.json();

  return json;
}

export async function fetchSubIndex(type) {
  const file = `public/data/${type}/index.json`;

  const response = await fetch(file);
  const json = await response.json();

  return json;
}
