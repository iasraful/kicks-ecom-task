import { useState, useCallback, useEffect } from 'react';

export const useApi = (apiFunc, options = {}) => {
    const { immediate = true, initialData = null } = options;
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiFunc(...args);
            setData(response.data);
            return { data: response.data, error: null };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
            setError(errorMessage);
            return { data: null, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, execute]);

    return { data, loading, error, execute };
};
