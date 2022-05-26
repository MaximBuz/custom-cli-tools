#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;

const [baseUrl, ...fetchers] = args;

// script
const fs = require("fs");
const endPointsCreator = require("./endPointsCreator");
const hookCreator = require('./hookCreator');

// constants
const BASE_PATH = "./api-client";

// creat custom hook just for making API requests
try {
  fs.mkdirSync(BASE_PATH, { recursive: true });
  const useApiResultCode = fs.readFileSync("./useApiResults.txt", "utf-8");
  fs.writeFileSync(BASE_PATH + "/useApiResult.js", useApiResultCode);
} catch (err) {
  console.error(err);
}

// create router that prepares data to pass in the custom hook above
try {
  fs.writeFileSync(BASE_PATH + "/endpoints.js", endPointsCreator(baseUrl, fetchers));
} catch (err) {
  console.error(err);
}

// create a custom hook for every fetcher
try {
  const HOOK_PATH = BASE_PATH + "/hooks/";
  fs.mkdirSync(HOOK_PATH, { recursive: true });
  for (let fetcher of fetchers) {
    fs.writeFileSync(HOOK_PATH + `/use${String(fetcher[0].toUpperCase() + fetcher.slice(1))}.js`, hookCreator(fetcher));
  }
} catch (err) {
  console.error(err);
}

console.log("done!");