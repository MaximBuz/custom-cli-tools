#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;
const [fileName, varName] = args;

// script
const fs = require("fs");
const { getMutations, getQueries } = require("./utils/getFunctionNames");
const { handleMutationsES6 } = require("./utils/handleMutations");
const { handleQueriesES6 } = require("./utils/handleQueries");
const { getNonScalars, handleType } = require("./utils/handleType");
const { toFolderName } = require("./utils/renameTypes");

let data;

// reading the file
try {
  data = fs.readFileSync(`./${fileName}`, 'utf8');
} catch (err) {
  console.error(err);
}

// get full schema
const schemaString = data.match(/(typeDef = `)([\s\S]*?)`/g)?.[0]?.replace(`${varName || "typeDef"} =`, "")?.replaceAll("`", "");
const mutations = getMutations(schemaString);
const queries = getQueries(schemaString);
const types = schemaString.match(/(?<=type )(.*)(?= {)/g);

try {
  // create resolvers folders
  for (const type of types) {
    if (type == "Mutation") handleMutationsES6(mutations);
    else if (type == "Query") handleQueriesES6(queries);
    else handleType(type, getNonScalars(type, schemaString));
  }

  // create index file with all resolvers
  const path = `./resolvers`;
  fs.writeFileSync(path + "/index.js",
    `${types.map(type => `import { ${type} } from "./${toFolderName(type)}";`).join("\n")}\n\nexport const resolvers = {\n${types.map(type => `\t${type},`).join("\n")}\n};`
  );
} catch (err) {
  console.error(err);
}