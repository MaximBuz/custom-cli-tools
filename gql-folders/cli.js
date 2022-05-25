#!/usr/bin/env node

// grab arguments
const [, , ...args] = process.argv;

// script
const fs = require("fs");

try {
  const data = fs.readFileSync(`./${args[0]}`, 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}