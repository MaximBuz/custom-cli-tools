const fs = require("fs");

module.exports = function getValidationSchema() {
  return JSON.parse(fs.readFileSync(`./schema.json`));
}