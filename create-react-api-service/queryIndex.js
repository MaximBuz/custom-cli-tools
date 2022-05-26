module.exports = queryIndex = () => (
`import { useState, useEffect } from "react";

export default function useApiResult(request, options) {
	const [results, setResults] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(request, options)
			.then(async (response) => {
				if (response.ok) {
					setResults(await response.json());
					setError(null);
				} else {
					setError(await response.text());
				}
			})
			.catch(err => setError(err))
	}, [request])

	return [results, error];
}`
);
