#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;
const [fileName, varName] = args;

// script
const fs = require("fs");

let data;

// reading the file
try {
  data = fs.readFileSync(`./${fileName}`, 'utf8');
} catch (err) {
  console.error(err);
}

// get full schema
const schemaString = data.match(/(typeDef = `)([\s\S]*?)`/g)?.[0]?.replace(`${varName} =`, "")?.replaceAll("`", "");

// get all type names
const types = schemaString.match(/(?<=type )(.*)(?= {)/g);

try {
  for (type of types) {
    const path = `./resolvers/${type.toLowerCase()}s`
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(path + "/index.js", "")
  }
} catch (err) {
  console.error(err);
}

console.log(types);