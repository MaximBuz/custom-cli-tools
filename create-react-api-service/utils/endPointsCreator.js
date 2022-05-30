module.exports = async function endPointsCreator (baseUrl, endpoints) {
  const baseUrlCode = `export const BASE_URL = "${baseUrl}";\n`;
  const createUrlCode = "const createUrl = (base, path) => `${base}${path}`;\n";

  const endPointsCode = endpoints.map(endpoint => {
    const { name, desc, params, request } = endpoint;
    return `
// ${desc}
export const ${name} = (${params ? params.join(", ") : ""}) => [
  createUrl(BASE_URL, \`${request.path.replace(/(:).*?(?=\/|($))/g, "${id}")}\`),
  {
    method: ${request.method},
    ${request.headers ? `headers: {${request.headers.map(header => `"${header.key}": "${header.value}"`).join(",\n")}},` : ""}
    ${request.body ? `body: ${request.body},` : ""}
  }
];
`;
  });


  return `${baseUrlCode}\n${createUrlCode}${endPointsCode.join("") || ""}`;
};

/* EXPECTED RESULT:

export const BASE_URL = "https://api";

export const getTopics = () => [
  createUrl(BASE_URL, "/"),
  { method: "GET" }
];

export const downVoteTopic = (id) => [
  createUrl(BASE_URL, "/" + id + "/downvote"),
  { method: "PUT" }
];

export const upVoteTopic = (id) => [
  createUrl(BASE_URL, "/" + id + "/upvote"),
  { method: "PUT" }
];

export const deleteTopic = (id) => [
  createUrl(BASE_URL, "/" + id),
  { method: "DELETE" }
];

export const addTopic = (id, data) => [
  createUrl(BASE_URL, "/" + id),
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  }
];
*/
