module.exports = {
  getMutations (schemaString) {
    try {
      let [mutationContent] = schemaString.match(/(?<=Mutation\s?{)([\s\S]*?)(?=})/gi);

      // clean whitespace
      mutationContent = mutationContent.replace(/[^\S\r\n]{2,}/gi, '').trim();

      // remove function params
      mutationContent = mutationContent.replace(/(\()([\s\S]*?)\)/g, "");

      // get list of function names
      mutationContent = mutationContent.match(/(?:\n)([\s\S]*?)(:)/g);
      return mutationContent.map(name => name.trim().replace(":", ""));
    } catch {
      return;
    }
  },
  getQueries (schemaString) {
    try {
      let [queryContent] = schemaString.match(/(?<=Query\s?{)([\s\S]*?)(?=})/gi);

      // clean whitespace
      queryContent = queryContent.replace(/[^\S\r\n]{2,}/gi, '').trim();

      // remove function params
      queryContent = queryContent.replace(/(\()([\s\S]*?)\)/g, "");

      // get list of function names
      queryContent = queryContent.match(/(?:\n)([\s\S]*?)(:)/g);
      return queryContent.map(name => name.trim().replace(":", ""));
    } catch {
      return;
    }
  }
};