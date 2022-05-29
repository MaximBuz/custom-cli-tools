const fs = require("fs");
module.exports = {
  handleMutationsES6 (mutations, template) {
    const path = `./resolvers/mutations`;

    fs.mkdirSync(path, { recursive: true });

    for (const mutation of mutations) {
      fs.writeFileSync(path + `/${mutation}.${template}`,
        `export async function ${mutation}(_parent, _args, context) {
  let ${mutation.toLowerCase()};
  
  return ${mutation.toLowerCase()};
}`
      );
    }
    fs.writeFileSync(path + "/index." + template,
      `${mutations.map(mutation => `import { ${mutation} } from "./${mutation}";`).join("\n")}\n\nexport const Mutation = {\n${mutations.map(mutation => `\t${mutation},`).join("\n")}\n};`
    );
  }
};