#!/usr/bin/env node
const prompts = require('prompts');

(async () => {
  // Grabing user Info

  let { baseUrl } = await prompts({
    type: 'text',
    name: 'baseUrl',
    message: 'What is the BaseURL?',
  });
  let { getters } = await prompts({
    type: 'text',
    name: 'getters',
    message: 'Please provide a comma seperated list of simple get requests',
  });
  let { gettersById } = await prompts({
    type: 'text',
    name: 'gettersById',
    message: 'Please provide a comma seperated list of getById requests',
  });
  let { mutations } = await prompts({
    type: 'text',
    name: 'mutations',
    message: 'Please provide a comma seperated list of all other requests (mutations)',
  });

  // create arrays from answers
  getters = getters?.split(",");
  gettersById = gettersById?.split(",");
  mutations = mutations?.split(",");


  // script
  const fs = require("fs");
  const endPointsCreator = require("./endPointsCreator");
  const queryHookCreator = require('./queryHookCreator');
  const createQueryIndexCode = require("./queryIndex");
  const mutationHookCreator = require('./mutationHookCreator');
  const createMutationIndexCode = require("./mutationIndex");

  // constants
  const BASE_PATH = "./api-client";
  const MUTATIONS_PATH = BASE_PATH + "/mutations";
  const QUERY_PATH = BASE_PATH + "/queries";

  // create folders
  try {
    // mutations folder
    fs.mkdirSync(MUTATIONS_PATH, { recursive: true });
    fs.writeFileSync(MUTATIONS_PATH + "/index.js", createMutationIndexCode());

    // queries folder
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
      fs.writeFileSync(QUERY_HOOK_PATH + `/use${String(getter[0].toUpperCase() + getter.slice(1))}.js`, queryHookCreator(getter));
    }
  } catch (err) {
    console.error(err);
  }

  // create a custom hook for every mutation
  try {
    const MUTATIONS_HOOK_PATH = MUTATIONS_PATH + "/hooks/";
    fs.mkdirSync(MUTATIONS_HOOK_PATH, { recursive: true });
    for (let mutation of mutations) {
      fs.writeFileSync(MUTATIONS_HOOK_PATH + `/use${String(mutation[0].toUpperCase() + mutation.slice(1))}.js`, mutationHookCreator(mutation));
    }
  } catch (err) {
    console.error(err);
  }


  /* 
  // TODO: IMPLEMENT GETTER BY ID HOOKS!!
  */

  console.log("done!");

})();