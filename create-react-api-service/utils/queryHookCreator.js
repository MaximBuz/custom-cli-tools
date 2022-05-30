const name = require("./transformName");

module.exports = function queryHookCreator (endpoint) {
  const importsLine = `import { useMemo } from "react";\nimport useApiResult from "..";\nimport { ${endpoint.name} } from "../../endpoints";\n`;

  const hook = `export default function use${name(endpoint.name)} (${endpoint.params ? endpoint.params.join(", ") : ""}) {
  const [url, options] = useMemo(() => ${endpoint.name}(${endpoint.params ? endpoint.params.join(", ") : ""}), []);
  return useApiResult(url, options);
}`;

  return `${importsLine}\n${hook}`;
};

/* EXPECTED RESULT:

import { useState, useEffect, useMemo } from "react";
import useApiResult from "./useApiResult";
import { getTodos } from "./requests";

export default function useTodos () {
  const request = useMemo(() => getTodos(), []); // stable identity
  return useApiResult(...request);
}

*/
