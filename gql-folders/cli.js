#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;
const [fileName, varName] = args;

// script
const fs = require("fs");

try {
  const data = fs.readFileSync(`./${fileName}`, 'utf8');

  // get full schema
  const schemaString = data.match(/(typeDef = `)([\s\S]*?)`/g)?.[0]?.replace(`${varName} =`, "")?.replaceAll("`", "");
  
  // get all type names
  const types = schemaString.match(/(?<=type )(.*)(?= {)/g)

  console.log(types);
} catch (err) {
  console.error(err);
}