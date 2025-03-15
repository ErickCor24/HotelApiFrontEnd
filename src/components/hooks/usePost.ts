import { useState } from "react"
import axios from "axios";

interface Props<T> {
    object: T | null;
    loading: boolean;
    error: Error | null;
    postData: (url: string, data: T) => void;
}

export function usePost<T>(): Props<T> {
    const [object, setObject] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const postData = async (url: string, data: T) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });
            setObject(response.data);
            return response.data;
        } catch (error) {
            setError(error as Error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { object, postData, loading, error };
}