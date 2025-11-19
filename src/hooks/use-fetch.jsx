import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, initialOptions = {}) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const { session } = useSession();

    const fn = async (options = {}, ...args) => {
        setLoading(true);
        setError(null);

        try {
            const supabaseAccessToken = await session?.getToken({
                template: "supabase",
            });

            const mergedOptions = { ...initialOptions, ...options };

            const response = await cb(supabaseAccessToken, mergedOptions, ...args);

            setData(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, loading, error };
};

export default useFetch;
