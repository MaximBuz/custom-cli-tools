module.exports = function mutationHookCreator (mutation) {
  const importsLine = `import mutation from '..';\nimport { ${mutation} } from '../../endpoints';\n`;

  const hook = `export default function ${String(mutation[0].toUpperCase() + mutation.slice(1))}Mutation (id, data) {
  return mutation(...${mutation}(id, data));
};
`

  return `${importsLine}\n${hook}`;
};

/* EXPECTED RESULT:

import mutation from '..';
import { addTopic } from '../../endpoints';

export default function addTopicMutation (data) {
  return mutation(...addTopic(data));
};

*/
