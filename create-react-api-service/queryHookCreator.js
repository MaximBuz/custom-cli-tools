module.exports = function queryHookCreator (fetcher) {
  const importsLine = `import { useMemo } from "react";\nimport useApiResult from "..";\nimport { ${fetcher} } from "../endpoints";\n`;

  const hook = `export default function use${String(fetcher[0].toUpperCase() + fetcher.slice(1))} () {
  const [url, options] = useMemo(() => ${fetcher}(), []);
  return useApiResult(url, options);
}`

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
