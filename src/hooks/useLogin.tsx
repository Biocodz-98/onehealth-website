import { useEffect, useRef, useState } from "react";
const process = import.meta.env;
export interface errorType {
	[key: string]: string;
}
export type Result = { [key:string]:string;};

export default function UseLogin(userDetails: {email: string; password: string}) {
	const [userResult, setUserResult] = useState<Result>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<errorType>({});

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const getUserLogin = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();
			setLoading(true);

			try {
				if (!userDetails) return;
				const response = await fetch(
					process.VITE_BASE_URL + "/api/products/search?query=" + userDetails,
					{
						signal: abortControllerRef.current.signal,
					}
				);

				const responseJSON = (await response.json()) as {
					results: Result;
					success: boolean;
				};
				setUserResult(responseJSON.results);
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

		getUserLogin();
	}, []);

	return {
		error,
		loading,
		userResult,
		setUserResult,
	};
}
