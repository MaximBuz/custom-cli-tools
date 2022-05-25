# gql-folders-script
Easily create a clean folder structure based on a GraphQL schema string

Just go into the a folder with a file that contains your GraphQL schema and run <code>npx gql-folder-cli [filename.ts] [variableName]</code>.

The file with your GraphQL schema should look roughly as follows:

<code>
export const typeDefs = `
  type User {
    id: Int!
    username: String!
  }

  type Something {
    id: Int!
    user: User
    userId: Int!
  }

  type Mutation {
    createNewUser(email: String!): User
    createSomething: Something
  }
`;
</code>

The folder structure will rougly look as follows:

<code>
  resolvers/
  ├─ mutations/
  │  ├─ createSomething.js
  │  ├─ index.js
  ├─ something/
  │  ├─ index.js
  │  ├─ user.js
  ├─ user/
  │  ├─ index.js
  ├─ index.js
</code>

Every file initializes the resolver functions and exports them in the index.js.
The main index.js will look as follows:

<code>
  import { User } from "./user";
  import { Something } from "./something";
  import { Mutation } from "./mutations";

  export const resolvers = {
    User,
    Something,
    Mutation,
  };
</code>
