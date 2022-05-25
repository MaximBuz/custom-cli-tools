# gql-folders-script
Easily create a clean folder structure based on a GraphQL schema string

Just go into the a folder with a file that contains your GraphQL schema and run <code>npx gql-folder-cli [filename.ts] [variableName]</code>.

The file with your GraphQL schema should look roughly as follows:


export const typeDefs = `\n
  type User {\n
    id: Int!\n
    username: String!\n
  }\n
\n
  type Something {\n
    id: Int!\n
    user: User\n
    userId: Int!\n
  }\n
\n
  type Mutation {\n
    createNewUser(email: String!): User\n
    createSomething: Something\n
  }\n
`;\n


The folder structure will rougly look as follows:

<code>\n
  resolvers/\n
  ├─ mutations/\n
  │  ├─ createSomething.js\n
  │  ├─ index.js\n
  ├─ something/\n
  │  ├─ index.js\n
  │  ├─ user.js\n
  ├─ user/\n
  │  ├─ index.js\n
  ├─ index.js\n
</code>

Every file initializes the resolver functions and exports them in the index.js.
The main index.js will look as follows:

<code>
  import { User } from "./user";\n
  import { Something } from "./something";\n
  import { Mutation } from "./mutations";\n
\n
  export const resolvers = {\n
    User,\n
    Something,\n
    Mutation,\n
  };\n
</code>
