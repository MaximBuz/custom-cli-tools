# Generate a REST-API-Service inside your React application
### Create a clean API-Service with easy-to-use hooks for data fetching and data-mutation with REST APIs.

Simply go inside your <code>src</code> folder and run <code>npx create-react-api-service [endpoints.json]</code>.
Please provide a valid schema file with a description of all your API endpoints as a parameter to the command. You can find the full JSON Schema definition inside the <code>schema.json</code> file. An example of a valid schema is given in the <code>valid-example-data.json</code> file.

For illustrative purposes, here is a valid schema with just one endpoint:

```json
     {
       "base_url": "https://movies.com",
       "endpoints": [
         {
           "name": "updateMovie",
           "desc": "Update a movie",
           "params": ["id", "data"],
           "request": {
             "path": "/movies/:id",
             "method": "PUT",
             "headers": [
               {
                 "key": "Content-Type",
                 "value": "application/json"
               }
             ],
             "body": "data"
           }
         }
       ]
     }
```

<i>Note: If you have dynamic values like IDs in your endpoints, make sure to declare them like that inside your schema: <code>.../:id/...</code></i> 

Suppose, we have declared a couple of endpoints related to movies and actors inside our schema file.
The following folder structure will be generated:

     api-service/
      ├─ endpoints.js
      ├─ index.js
      ├─ queries/
      │  ├─ index.js
      │  ├─ hooks/
      │  │  ├─ useGetMovie.js
      │  │  ├─ useGetMovies.js
      │  │  ├─ useGetActor.js
      │  │  ├─ useGetActors.js
      ├─ mutations/
      │  ├─ index.js
      │  ├─ hooks/
      │  │  ├─ useAddMovie.js
      │  │  ├─ useAddActor.js
      │  │  ├─ useUpdateMovie.js
      │  │  ├─ useUpdateActor.js
      
The <code>api-service/index.js</code> file will make all of your hooks available for consumption in your react app:

```jsx

      import useAddMovie from "./mutations/hooks/useAddMovie";
      import useAddActor from "./mutations/hooks/useAddActor";
      import useUpdateMovie from "./mutations/hooks/useUpdateMovie";
      import useUpdateActor from "./mutations/hooks/useUpdateActor";
      import useGetMovies from "./queries/hooks/useGetMovies";
      import useGetActors from "./queries/hooks/useGetActors";
      import useGetMovie from "./queries/hooks/useGetMovie";
      import useGetActor from "./queries/hooks/useGetActor";
      
      const api = {
          useAddMovie,
          useAddActor,
          useUpdateMovie,
          useUpdateActor,
          useGetMovie,
          useGetMovies,
          useGetActor,
          useGetActors,
       };
       export default api;
```

## Usage inside your components:

```jsx
      import api from '../../api-service/';
      
      export default function ComponentName () {
          const moviesQuery = api.useGetMovies();
          const actorsQuery = api.useGetActors();
          
          const updateMovie = api.useUpdateMovie();
          const updateActor = api.useUpdateActor();
          
          function handleUpdateMovie (id, data) {
               const mutation = updateMovie(id, JSON.stringify(data));
               mutation.mutate().then(() => {
                    console.log(mutation.results);
                    mutation.error && console.error(mutation.error);
                    moviesQuery.refetch();
               });
          }
          
          function handleUpdateActor (id, data) {
               const mutation = updateVenue(id, JSON.stringify(data));
               mutation.mutate().then(() => {
                    console.log(mutation.results);
                    mutation.error && console.error(mutation.error);
                    actorsQuery.refetch();
               });
          }
          
          return (
               <>
                    {moviesQuery.error
                         ? <p>{moviesQuery.error}</p>
                         : moviesQuery.results?.map((movie) => <p>{movie.title}</p>)
                    }
                    <button onClick={() => handleUpdateMovie(12, {data})}>Update Movie</button>
                    <button onClick={() => handleUpdateActor(222, {data}}>Update Actor</button>
               </>
          );
     }
```     
