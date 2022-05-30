const name = require("./transformName");

module.exports = function mutationHookCreator (endpoint) {
  const { name: methodName, params } = endpoint;
  const parameters = params ? params.join(", ") : ""

  const importsLine = `import useApiResult from '..';\nimport { ${methodName} } from '../../endpoints';\n`;

  const hook = `export default function use${name(methodName)} () {
  
  const mutation = useApiResult();
  
  return function (${parameters}) {
    return {
      mutate: mutation.mutate(...${methodName}(${parameters})),
      results: mutation.results,
      error: mutation.error
    }
  };
};
`;

  return `${importsLine}\n${hook}`;
};

/* EXPECTED RESULT:

import useApiResult from '..';
import { deleteEvent } from '../../endpoints';

export default function useDeleteEvent () {

  const mutation = useApiResult();

  return {
      mutate: () => mutation.mutate(...deleteEvent()),
      results: mutation.results,
      error: mutation.error
    }
};


*/
