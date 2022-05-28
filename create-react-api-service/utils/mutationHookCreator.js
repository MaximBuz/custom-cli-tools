const name = require("./transformName");

module.exports = function mutationHookCreator ({ method }) {
  const importsLine = `import useApiResult from '..';\nimport { ${method} } from '../../endpoints';\n`;

  const hook = `export default function use${name(method)} () {
  
  const mutation = useApiResult();
  
  return function (id, data) {
    return mutation.mutate(...${method}(id, data));
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
