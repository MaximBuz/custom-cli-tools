const name = require("./transformName");

module.exports = function mutationHookCreator (endpoint) {
  const importsLine = `import useApiResult from '..';\nimport { ${endpoint.name} } from '../../endpoints';\n`;

  const hook = `export default function use${name(endpoint.name)} (${endpoint.params ? endpoint.params.join(", ") : ""}) {
  
  const mutation = useApiResult();
  
  return function (id, data) {
    return mutation.mutate(...${endpoint.name}(${endpoint.params ? endpoint.params.join(", ") : ""}));
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

  return function (id) {
    return mutation.mutate(...deleteEvent(id));
  };
};


*/
