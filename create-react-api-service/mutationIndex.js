module.exports = queryIndex = () => (
`export default async function mutation (url, options) {
  return fetch(url, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(err => console.error(err));
}`
);
