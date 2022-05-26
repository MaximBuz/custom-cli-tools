const fs = require("fs");
module.exports = {
  handleMutationsES6 (mutations) {
    const path = `./resolvers/mutations`;

    fs.mkdirSync(path, { recursive: true });

    for (const mutation of mutations) {
      fs.writeFileSync(path + `/${mutation}.js`,
        `export function ${mutation}(_parent, _args, context) {}`
      );
    }
    fs.writeFileSync(path + "/index.js",
      `${mutations.map(mutation => `import { ${mutation} } from "./${mutation}";`).join("\n")}\n\nexport const Mutation = {\n${mutations.map(mutation => `\t${mutation},`).join("\n")}\n};`
    );
  }
};