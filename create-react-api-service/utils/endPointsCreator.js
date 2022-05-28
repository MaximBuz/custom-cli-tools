module.exports = async function endPointsCreator (baseUrl, getters, gettersById, mutations) {
  const baseUrlLine = `export const BASE_URL = "${baseUrl}";\n`;

  const createUrlLine = "const createUrl = (base, path) => `${base}${path}`;\n";
  const getterEndPoints = getters.map(getter => {
    return `export const ${getter.method} = () => [\n\tcreateUrl(BASE_URL, \`${getter.path.replace(/(:).*?(?=\/|($))/g, "${id}")}\`),\n\t{ method: "GET" }\n\n];`;
  });

  const getterByIdEndPoints = gettersById.map(getter => {
    return `export const ${getter.method} = (id) => [\n\tcreateUrl(BASE_URL, \`${getter.path.replace(/(:).*?(?=\/|($))/g, "${id}")}\`),\n\t{ method: "GET" }\n\n];`;
  });

  const mutationEndPoints = mutations.map(mutation => {
    return `export const ${mutation.method} = (id, data) => [\ncreateUrl(BASE_URL, \`${mutation.path.replace(/(:).*?(?=\/|($))/g, "${id}")}\`),\n{\n\tmethod: "POST",\n\theaders: {\n\t\t'Content-Type': 'application/x-www-form-urlencoded',\n\t},\n\tbody: data\n}\n];\n`;
  });

  return `${baseUrlLine}\n${createUrlLine}\n${getterEndPoints.join("\n") || ""}\n${getterByIdEndPoints.join("\n") || ""}\n${mutationEndPoints.join("\n") || ""}`;
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
