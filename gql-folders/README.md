# gql-folders-script
### Easily create a clean folder structure based on a GraphQL schema string

Just go into the folder that contains a file containing your GraphQL schema and run <code>npx gql-folder-cli [filename.js] [variableName]</code>.
By default, filename.js will be <code>schema.js</code> and variableName will be <code>typeDefs</code>.

The file containing your GraphQL schema should look as follows:

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


The generated folder structure will rougly look as follows:
    
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


Every file initializes the resolver functions and exports them in the index.js.
The main index.js will look as follows:

      import { User } from "./user";
      import { Something } from "./something";
      import { Mutation } from "./mutations";

      export const resolvers = {
        User,
        Something,
        Mutation,
      };

