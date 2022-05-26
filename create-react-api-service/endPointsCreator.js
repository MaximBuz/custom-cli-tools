const prompts = require('prompts');

module.exports = async function endPointsCreator (baseUrl, getters, gettersById, mutations) {
  const baseUrlLine = `export const BASE_URL = "${baseUrl}";\n`;

  const createUrlLine = "const createUrl = (base, path) => `${base}${path}`;\n";

  const getterEndPoints = await Promise.all(getters?.map(async getter => {
    const { endPointGetter } = await prompts({
      type: 'text',
      name: `endPointGetter${getter}`,
      message: `What is the Endpoint for ${getter}?`,
    });
    return `export const ${getter} = () => [\n\tcreateUrl(BASE_URL, "/${endPointGetter}"),\n\t{ method: "GET" }\n];`;
  }));

  const getterByIdEndPoints = await Promise.all(gettersById?.map(async getter => {
    const { endPointGetterById } = await prompts({
      type: 'text',
      name: `endPointGetterById${getter}`,
      message: `What is the Endpoint for ${getter}?`,
    });
    return `export const ${getter} = (id) => [\n\tcreateUrl(BASE_URL, "/${endPointGetterById}/" + id),\n\t{ method: "GET" }\n];`;
  }));

  const mutationEndPoints = await Promise.all(mutations?.map(async mutation => {
    const { endPointMutation } = await prompts({
      type: 'text',
      name: `endPointMutation${mutation}`,
      message: `What is the Endpoint for ${mutation}?`,
    });
    return `export const ${mutation} = (id, data) => [\ncreateUrl(BASE_URL, "/${endPointMutation}/" + id),\n{\n\tmethod: "POST",\n\theaders: {\n\t\t'Content-Type': 'application/x-www-form-urlencoded',\n\t},\n\tbody: data\n}\n];`;
  }));

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
