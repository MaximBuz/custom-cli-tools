const name = require("./transformName");

module.exports = function mutationHookCreator ({ method }) {
  const importsLine = `import mutation from '..';\nimport { ${method} } from '../../endpoints';\n`;

  const hook = `export default function use${name(method)} (id, data) {
  return mutation(...${method}(id, data));
};
`;

  return `${importsLine}\n${hook}`;
};

/* EXPECTED RESULT:

import mutation from '..';
import { addTopic } from '../../endpoints';

export default function addTopicMutation (data) {
  return mutation(...addTopic(data));
};

*/
