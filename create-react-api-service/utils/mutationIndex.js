// module.exports = queryIndex = () => (
//   `export default async function mutation (url, options) {
//   return fetch(url, options)
//     .then(res => res.status <= 400 ? res : Promise.reject(res))
//     .then(res => res.json())
//     .catch(err => console.error(err));
// }`
// );

module.exports = mutationIndex = () => (
`import { useState, useMemo } from "react";

export default function useApiResult (request, options) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  function mutate (request, options) {
    return fetch(request, options)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          setResults(data);
          setError(null);
          return data;
        } else {
          setError(await response.text());
        }
      })
      .catch(err => setError(err));
  }

  const mutation = useMemo( () => {
    results,
    error,
    mutate
  }, [results, error, request, options]);

  return mutation;
}`
);
