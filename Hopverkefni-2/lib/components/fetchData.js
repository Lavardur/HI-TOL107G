export async function fetchData(type) {
  const file = `/data/${type}/index.json`;
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json;
}

export async function fetchIndex() {
  const file = "/data/index.json";
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json;
}

export async function fetchSubData(type, content) {
  const file = `/data/${type}/${content}.json`;
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
    return null;
  }

  const json = await response.json();
  return json;
}
