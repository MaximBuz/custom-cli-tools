#!/usr/bin/env node
const fs = require("fs");
var validate = require('jsonschema').validate;

const getValidationSchema = require("./utils/getValidationSchema");
const endPointsCreator = require("./utils/endPointsCreator");
const queryHookCreator = require('./utils/queryHookCreator');
const createQueryIndexCode = require("./utils/queryIndex");
const mutationHookCreator = require('./utils/mutationHookCreator');
const createMutationIndexCode = require("./utils/mutationIndex");
const name = require("./utils/transformName");

(async () => {
  // Grabing user Info
  const [, , ...args] = process.argv;
  let [schemaFile] = args;

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(`./${schemaFile}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // validate correctness of given schema
  try {
    const validations = getValidationSchema();
    validate(schema, validations, { throwAll: true });
  } catch (err) {
    console.error(err.errors);
    process.exit(1);
  }

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
    process.exit(1);
  }

  // creates endpoints
  try {
    fs.writeFileSync(BASE_PATH + "/endpoints.js", await endPointsCreator(
      schema.base_url, // i.e. https://api.com
      schema.endpoints
    ));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // create a custom hook for every endpoint
  try {
    const QUERY_HOOK_PATH = QUERY_PATH + "/hooks/";
    const MUTATIONS_HANDLER_PATH = MUTATIONS_PATH + "/hooks/";

    fs.mkdirSync(QUERY_HOOK_PATH, { recursive: true });
    fs.mkdirSync(MUTATIONS_HANDLER_PATH, { recursive: true });

    for (let endpoint of schema.endpoints) {
      if (endpoint.request.method.toLowerCase() == "get")
        fs.writeFileSync(QUERY_HOOK_PATH + `/use${name(endpoint.name)}.js`, queryHookCreator(endpoint));
      else
        fs.writeFileSync(MUTATIONS_HANDLER_PATH + `/use${name(endpoint.name)}.js`, mutationHookCreator(endpoint));
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // create an api object exportet from index
  try {
    fs.writeFileSync(BASE_PATH + `/index.js`,
      `${schema.endpoints.map(endpoint => {
        if (endpoint.request.method.toLowerCase() == "get")
          return `import use${name(endpoint.name)} from "./queries/hooks/use${name(endpoint.name)}"`;
        else
          return `import use${name(endpoint.name)} from "./mutations/hooks/use${name(endpoint.name)}"`;
      }
      ).join("\n")}

const api = {
${schema.endpoints.map(endpoint => ("\tuse" + name(endpoint.name) + ",")).join("\n")}
}

export default api;`);
  } catch (err) {
    console.error(err);
  }

  console.log("done!");
  process.exit(0);

})();