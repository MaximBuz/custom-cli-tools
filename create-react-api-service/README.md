# Generate a REST-API-Service inside your React application
### Interactively create a clean clean API-Service with easy-to-use hooks for data fetching and data-mutation with REST APIs.

Simply go inside your <code>src</code> folder and run <code>npx create-react-api-service</code>.
You will be led through an interactive terminal session that will ask you for a bunch of endPoints.

* 1. First question:
     What is the BaseURL?
     > http://localhost:4000
Here, please type in the base URL of your API.
Note: It is recommendet to not type in a trailing slash at this point.

* 2. Question:
     Provide a list of getAll requests e.g. (getTodos=/todos, getTasks=/tasks)
     > getEvents=/events, getVenues=/venues
Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.
Note: This question only asks about the most generic GET requests, that do not need additional parameters like IDs etc.

* 3. Question:
     Provide a list of getById requests e.g. (getTodo=/todos/:id, getTask=/tasks/:id)
     > getEvent=/events/:id, getVenue=/venues/:id
Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.
Note: Here you should add GET requests, that require additional parameters like IDs. Always make sure to declare IDs as follows: <code>.../:id/...</code>.

* 4. Question:
     Provide a list of all mutation requests e.g. (updateTodo=/todos/:id, updateTask=/tasks/:id)
     > addEvent=/events, addVenue=/venue, updateEvent=/events/:id, updateVenue=/venues/:id
Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.
Note: This question asks about mutating requests. By default this will create POST requests, however you can easily modify the generated code to your needs.

After going through the interactive CLI (with above example answers), the following folder structure will be generated for you:

     api-service/
      ├─ endpoints.js
      ├─ index.js
      ├─ queries/
      │  ├─ index.js
      │  ├─ hooks/
      │  │  ├─ useGetEvent.js
      │  │  ├─ useGetEvents.js
      │  │  ├─ useGetVenue.js
      │  │  ├─ useGetVenues.js
      ├─ mutations/
      │  ├─ index.js
      │  ├─ hooks/
      │  │  ├─ useAddEvent.js
      │  │  ├─ useAddVenue.js
      │  │  ├─ useUpdateEvent.js
      │  │  ├─ useUpdateVenue.js
      
The <code>api-service/index.js<code/> file will make all of your hooks available for consumption in your react app:
      import { User } from "./user";
      import { Something } from "./something";
      import { Mutation } from "./mutations";

      export const resolvers = {
        User,
        Something,
        Mutation,
      };


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

