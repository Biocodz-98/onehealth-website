import { useEffect,useRef,useState } from "react"
const process = import.meta.env;
interface errorType {
	[key: string]: string;
}
type Result = {name:string,image:string,url?:string}

export default function useSearch(searchQuery: string) {
	const [searchResult, setSearchResult] = useState<Result[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<errorType>({});

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const searched = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();
			setLoading(true);

			try {
                if(!searchQuery) return;
                console.log("from env", process.VITE_BASE_URL);
				const response = await fetch(
					process.VITE_BASE_URL +
						"/api/products/search?query=" +
						searchQuery,
					{
						signal: abortControllerRef.current.signal,
					}
				);

				const responseJSON = (await response.json()) as {
					results: Result[];
					success: boolean;
				};
				setSearchResult(responseJSON.results);
            //@ts-ignore
			} catch (error: errorType) {
				if (error.name === "AbortError") {
					return;
				}
				setError(error);
			} finally {
				setLoading(false);
			}
			setLoading(false);
		};

		searched();
	}, [searchQuery]);

	return {
		error,
		loading,
		searchResult,
	};
}
