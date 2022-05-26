module.exports = function endPointsCreator (baseUrl, fetchers) {
  const baseUrlLine = `export const BASE_URL = "${baseUrl}";\n`;

  const createUrlLine = "const createUrl = (base, path) => `${base}${path}`;\n";

  const endPoints = fetchers.map(fetcher => `export const ${fetcher} = () => [\n\tcreateUrl(BASE_URL, "/${fetcher}"),\n\t{ method: "GET" }\n];`).join("\n");

  return `${baseUrlLine}\n${createUrlLine}\n${endPoints}`;
};

/* EXPECTED RESULT:

export const BASE_URL = "https://api";

const createUrl = (base, path) => `${base}${path}`;

export const getTodos = () => [
  createUrl(BASE_URL, "/todos"),
  { method: "GET" }
];

*/