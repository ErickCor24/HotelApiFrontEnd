import { useCallback, useState } from "react";

interface Props<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    getData: (url: string) => void;
}

export function useFetch<T>(): Props<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getData = useCallback( async (url: string) => {
        setLoading(true);
        try {
            console.log("Render useFecth");
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    return { data, loading, error, getData };
}