const fs = require("fs");
module.exports = {
  handleQueriesES6 (queries, template) {
    const path = `./resolvers/queries`;

    fs.mkdirSync(path, { recursive: true });

    for (const query of queries) {
      fs.writeFileSync(path + `/${query}.${template}`,
`export async function ${query}(_parent, _args, context) {
  let ${query.toLowerCase()}
  
  return ${query.toLowerCase()};
}`
      );
    }

    fs.writeFileSync(path + "/index." + template,
      `${queries.map(query => `import { ${query} } from "./${query}";`).join("\n")}\n\nexport const Query = {\n${queries.map(query => `\t${query},`).join("\n")}\n};`
    );
  }
};