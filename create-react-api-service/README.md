# Generate a REST-API-Service inside your React application
### Interactively create a clean clean API-Service with easy-to-use hooks for data fetching and data-mutation with REST APIs.

Simply go inside your <code>src</code> folder and run <code>npx create-react-api-service</code>.
You will be led through an interactive terminal session that will ask you for a bunch of endPoints.

1. <b>What is the BaseURL?</b> <br/>
     <code>$ http://localhost:4000</code><br/>
     Here, please type in the base URL of your API.<br/>
     <i>Note: It is recommended to <b>not</b> type in a trailing slash at this point.</i>

2. <b>Provide a list of getAll requests e.g. (getTodos=/todos, getTasks=/tasks)</b> <br/>
     <code>$ getEvents=/events, getVenues=/venues</code><br/>
     Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.<br/>
     <i>Note: This question only asks about the most generic GET requests, that do not need additional parameters like IDs etc.</i>

3. <b>Provide a list of getById requests e.g. (getTodo=/todos/:id, getTask=/tasks/:id)</b> <br/>
     <code>$ getEvent=/events/:id, getVenue=/venues/:id</code><br/>
     Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.<br/>
     <i>Note: Here you should add GET requests, that require additional parameters like IDs. Always make sure to declare IDs as follows: <code>.../:id/...</code>.</i>
     

4. <b>Provide a list of all mutation requests e.g. (updateTodo=/todos/:id, updateTask=/tasks/:id)</b><br/>
     <code>$ addEvent=/events, addVenue=/venue, updateEvent=/events/:id, updateVenue=/venues/:id</code><br/>
     Here, please type in a comma-seperated list of JavaScript method-names and it's respective endpoints.<br/>
     <i>Note: This question asks about mutating requests. By default this will create POST requests, however you can easily modify the generated code to your needs.</i>

After going through the interactive CLI (i.e. with above answers), the following folder structure will be generated for you:

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
      
The <code>api-service/index.js</code> file will make all of your hooks available for consumption in your react app:

      import useAddEvent from "./mutations/hooks/useAddEvent";
      import useAddVenue from "./mutations/hooks/useAddVenue";
      import useUpdateEvent from "./mutations/hooks/useUpdateEvent";
      import useUpdateVenue from "./mutations/hooks/useUpdateVenue";
      import useGetEvents from "./queries/hooks/useGetEvents";
      import useGetVenues from "./queries/hooks/useGetVenues";
      import useGetEvent from "./queries/hooks/useGetEvent";
      import useGetVenue from "./queries/hooks/useGetVenue";
      
      const api = {
          useAddEvent,
          useAddVenue,
          useUpdateEvent,
          useUpdateVenue,
          
          useGetEvents,
          useGetVenues,
          useGetEvent,
          useGetVenue,
       };
       export default api;


## Usage inside your components:

      import api from '../../api-service/';
      
      export default function ComponentName () {
          const eventsQuery = api.useGetEvents();
          const venueQuery = api.useGetVenues();
          
          const addEvent = api.useAddEvent();
          const addVenue = api.useAddVenue();
          
          const updateEvent = api.useUpdateEvent();
          const updateVenue = api.useUpdateVenue();
          
          function handleUpdateEvent (id, data) {
               updateEvent(id, data).then(() => eventsQuery.refetch());
          }
          
          function handleUpdateVenue (id, data) {
               updateVenue(id, data).then(() => venueQuery.refetch());
          }
          
          return (
               <>
                    {eventsQuery.error
                         ? <p>eventsQuery.error</p>
                         : eventsQuery.results?.map((event) => <p>{event.title}</p>)
                    }
                    <button onClick={handleUpdateEvent}>Update Event</button>
                    <button onClick={handleUpdateVenue}>Update Venue</button>
               </>
          );
     }
## Customization
Please be aware that depending on your data and your endpoints, you might have to customize the generated code for your needs. For that, please first go inside the <code>api-service/endpoints.js</code> file and make the desired changes (i.e. METHOD-Options, necessary parameters, query strings etc.). After that is done, make sure your hooks are compatible by going inside the respective hook file and updating the function signature to conform to your changes in in the endpoints (i.e. only taking a <code>data</code> parameter, instead of <code>id, data</code>).
