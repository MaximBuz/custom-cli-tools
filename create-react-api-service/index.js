#!/usr/bin/env node

// grab arguments
const args = require('minimist')(process.argv.slice(2));
const baseUrl = args?.baseUrl;
const getters = args?.get?.split(",");
const gettersById = args?.getById?.split(",");
const mutations = args?.mutation?.split(",");

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
  fs.writeFileSync(BASE_PATH + "/endpoints.js", endPointsCreator(baseUrl, getters, gettersById, mutations));
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