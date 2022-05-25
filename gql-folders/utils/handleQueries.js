const fs = require("fs");
module.exports = {
  handleQueriesES6 (queries) {
    const path = `./resolvers/queries`;

    fs.mkdirSync(path, { recursive: true });

    for (const query of queries) {
      fs.writeFileSync(path + `/${query}.js`,
        `export function ${query}(_parent, _args, context) {}`
      );
    }

    fs.writeFileSync(path + "/index.js",
      `${queries.map(query => `import { ${query} } from "./${query}";`).join("\n")}\n\nexport const Query = {\n${queries.map(query => `\t${query},`).join("\n")}\n};`
    );
  }
};