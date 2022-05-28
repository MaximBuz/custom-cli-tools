#!/usr/bin/env node
const prompts = require('prompts');
const fs = require("fs");

const questions = require('./utils/questions');
const endPointsCreator = require("./utils/endPointsCreator");
const queryHookCreator = require('./utils/queryHookCreator');
const createQueryIndexCode = require("./utils/queryIndex");
const mutationHookCreator = require('./utils/mutationHookCreator');
const createMutationIndexCode = require("./utils/mutationIndex");
const name = require("./utils/transformName");

(async () => {
  // Grabing user Info
  let { baseUrl, get, getById, mutate } = await prompts(questions.initial);

  const getters = get[0].length > 1 ? get.map(getter => {
    const [method, path] = getter.split("=");
    return { method, path };
  }) : [];

  const gettersById = getById[0].length > 1 ? getById.map(getter => {
    const [method, path] = getter.split("=");
    return { method, path };
  }) : [];

  const mutations = mutate[0].length > 1 ? mutate.map(getter => {
    const [method, path] = getter.split("=");
    return { method, path };
  }) : [];

  // constants
  const BASE_PATH = "./api-client";
  const MUTATIONS_PATH = BASE_PATH + "/mutations";
  const QUERY_PATH = BASE_PATH + "/queries";

  // create folders with index
  try {
    fs.mkdirSync(MUTATIONS_PATH, { recursive: true });
    fs.writeFileSync(MUTATIONS_PATH + "/index.js", createMutationIndexCode());

    fs.mkdirSync(QUERY_PATH, { recursive: true });
    fs.writeFileSync(QUERY_PATH + "/index.js", createQueryIndexCode());
  } catch (err) {
    console.error(err);
  }

  // creates endpoints
  try {
    fs.writeFileSync(BASE_PATH + "/endpoints.js", await endPointsCreator(baseUrl, getters, gettersById, mutations));
  } catch (err) {
    console.error(err);
  }

  // create a custom hook for every getter
  try {
    const QUERY_HOOK_PATH = QUERY_PATH + "/hooks/";
    fs.mkdirSync(QUERY_HOOK_PATH, { recursive: true });
    for (let getter of getters) {
      fs.writeFileSync(QUERY_HOOK_PATH + `/use${name(getter.method)}.js`, queryHookCreator(getter, false));
    }
  } catch (err) {
    console.error(err);
  }

  // create a custom hook for every getterById
  try {
    const QUERY_HOOK_PATH = QUERY_PATH + "/hooks/";
    fs.mkdirSync(QUERY_HOOK_PATH, { recursive: true });
    for (let getter of gettersById) {
      fs.writeFileSync(QUERY_HOOK_PATH + `/use${name(getter.method)}.js`, queryHookCreator(getter, true));
    }
  } catch (err) {
    console.error(err);
  }

  // create a custom hook for every mutation
  try {
    const MUTATIONS_HANDLER_PATH = MUTATIONS_PATH + "/hooks/";
    fs.mkdirSync(MUTATIONS_HANDLER_PATH, { recursive: true });
    for (let mutation of mutations) {
      fs.writeFileSync(MUTATIONS_HANDLER_PATH + `/use${name(mutation.method)}.js`, mutationHookCreator(mutation));
    }
  } catch (err) {
    console.error(err);
  }

  // create an api object exportet from index
  try {
    fs.writeFileSync(BASE_PATH + `/index.js`,
      `${mutations.map(mutation => `import use${name(mutation.method)} from "./mutations/hooks/use${name(mutation.method)}"\n`).join("\n")}${getters.map(getter => `import use${name(getter.method)} from "./queries/hooks/use${name(getter.method)}"\n`).join("\n")}${gettersById.map(getter => `import use${name(getter.method)} from "./queries/hooks/use${name(getter.method)}"\n`).join("\n")}

const api = {
  ${mutations.map(mutation => ("use" + name(mutation.method) + ",")).join("\n")}
  ${getters.map(getter => ("use" + name(getter.method) + ",")).join("\n")}
  ${gettersById.map(getter => ("use" + name(getter.method) + ",")).join("\n")}
}

export default api;`);
  } catch (err) {
    console.error(err);
  }

  console.log("done!");

})();