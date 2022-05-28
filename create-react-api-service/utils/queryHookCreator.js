const name = require("./transformName");

module.exports = function queryHookCreator ({ method }, withId) {
  const importsLine = `import { useMemo } from "react";\nimport useApiResult from "..";\nimport { ${method} } from "../../endpoints";\n`;

  const hook = `export default function use${name(method)} (${withId ? "id" : ""}) {
  const [url, options] = useMemo(() => ${method}(${withId ? "id" : ""}), []);
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
