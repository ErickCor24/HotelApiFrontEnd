import { useState } from "react";
import axios from "axios";

interface Props<T> {
    object: T | null;
    loading: boolean;
    error: Error | null;
    putData: (url: string, data: T) => void;
}

export function usePut<T>(): Props<T> {

    const [object, setObject] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const putData = async (url: string, data: T) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(url, data, {
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

    return { object, loading, error, putData };
}

