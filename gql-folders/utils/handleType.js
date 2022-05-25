const fs = require("fs");
const { toFolderNames } = require("./renameTypes");

module.exports = {
  getNonScalars (typeName, schemaString) {
    try {
      // get all fields from within Type
      const fieldRX = new RegExp("(?<=" + typeName + ".*{)([\\s\\S]*?)(?=})", "g");
      let [typeContents] = schemaString.match(fieldRX);
  
      // clean whitespace
      typeContents = typeContents.replace(/[^\S\r\n]{2,}/gi, '').trim();
  
      // get all field types
      const fields = typeContents.match(/(?<=: )([\s\S]*?)(\n|$)/g);
  
      // filter out everyhting that is not a scalar
      const nonScalars = fields.filter(field => {
        field = field.replace("!", "").toLowerCase().trim();
        if (field == "int") return false;
        if (field == "float") return false;
        if (field == "string") return false;
        if (field == "boolean") return false;
        if (field == "id") return false;
        return true;
      });
  
      return nonScalars;
    } catch {
      return
    }
  },
  handleType (typeName, nonScalars) {
    nonScalars = toFolderNames(nonScalars);
    const path = `./resolvers/${typeName.toLowerCase()}`;
    fs.mkdirSync(path, { recursive: true });

    for (const nonScalar of nonScalars) {
      fs.writeFileSync(path + `/${nonScalar.toLowerCase()}.js`,`export function ${nonScalar}(_parent, _args, context) {};`);
    }

    fs.writeFileSync(path + "/index.js",`${nonScalars.map(nonScalar => `import { ${nonScalar} } from "./${nonScalar}";`).join("\n")}\n\nexport const ${typeName} = {\n${nonScalars.map(nonScalar => `\t${nonScalar},`).join("\n")}\n};`);
  }
};