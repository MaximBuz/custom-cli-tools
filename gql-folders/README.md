# Generate GraphQL Resolver Templates
### Easily create a clean folder structure based on a GraphQL schema string

Just go into the folder that contains a .graphql file containing your schema and run <code>npx init-gql-resolvers [filename.graphql] [template]</code>.
By default, filename.grahpql will be <code>schema.graphql</code> and template will be <code>js</code>. You can also use <code>ts</code> as a template and all your files will be TypeScript files. Unfortunately no additional TypeScript features like Types etc. will be generated (coming soon...).

The generated folder structure will rougly look as follows:
    
     resolvers/
      ├─ mutations/
      │  ├─ createUser.js
      │  ├─ deleteUser.js
      │  ├─ updateUser.js
      │  ├─ index.js
      ├─ queries/
      │  ├─ index.js
      │  ├─ getUserById.js
      │  ├─ getAllUsers.js
      ├─ user/
      │  ├─ index.js
      ├─ index.js


Every file initializes the asynchronous resolver functions and exports them into the <code>index.js</code>.
The main <code>index.js</code> will look as follows:

      import { User } from "./user";
      import { Query } from "./queries";
      import { Mutation } from "./mutations";

      export const resolvers = {
        User,
        Query,
        Mutation,
      };

