#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;
let [fileName, template] = args;

if (!fileName) fileName = "schema.graphql";
if (template != "js" && template != "ts") template = "js";

// script
const fs = require("fs");
const { getMutations, getQueries } = require("./utils/getFunctionNames");
const { handleMutationsES6 } = require("./utils/handleMutations");
const { handleQueriesES6 } = require("./utils/handleQueries");
const { getNonScalars, handleType } = require("./utils/handleType");
const { toFolderName } = require("./utils/renameTypes");

// reading in the schema
let schemaString;
try {
  schemaString = fs.readFileSync(`./${fileName}`, 'utf8');
} catch (err) {
  console.error(err);
}

// extracting mutations, queries and types from schema
const mutations = getMutations(schemaString);
const queries = getQueries(schemaString);
const types = schemaString.match(/(?<=type )(.*)(?= {)/g);

try {
  // create resolvers folders
  for (const type of types) {
    if (type == "Mutation") handleMutationsES6(mutations, template);
    else if (type == "Query") handleQueriesES6(queries, template);
    else handleType(type, getNonScalars(type, schemaString), template);
  }

  // create index file with all resolvers
  const path = `./resolvers`;
  fs.writeFileSync(path + "/index." + template,
    `${types.map(type => `import { ${type} } from "./${toFolderName(type)}";`).join("\n")}\n\nexport const resolvers = {\n${types.map(type => `\t${type},`).join("\n")}\n};`
  );
} catch (err) {
  console.error(err);
}