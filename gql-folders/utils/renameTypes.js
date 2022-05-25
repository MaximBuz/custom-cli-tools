module.exports = {
  toFolderNames (types) {
    return types.map(type => {
      if (type == "Mutation") return "mutations";
      if (type == "Query") return "queries";
      return type[0].toLowerCase() + type.slice(1);
    });
  },
  toFolderName (type) {
    if (type == "Mutation") return "mutations";
    if (type == "Query") return "queries";
    return type[0].toLowerCase() + type.slice(1);
  }
};