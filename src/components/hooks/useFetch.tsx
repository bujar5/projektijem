import {useState, useEffect} from "react"

function useFetch<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //GET request on mount
    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }
        fetch(url)
        .then((response) => response.json())
        .then((result) => {
            setData(result);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message || "GET request failed");
            setLoading(false);
        })
    }, [url]);
   
   
     //POST
    async function post<D>(payload: D) {
        setLoading(true)
        setError(null)
        try{
            if (!url) throw new Error("URL is null");
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            const result = await res.json();
            setData(result);
            return result;
        }catch(err: any){
            setError(err.message || "POST failed");
        }finally {
            setLoading(false)
        }
    }

    //PUT
    async function put<D>(payload: D) {
        setLoading(true)
        setError(null)
        try{
            if (!url) throw new Error("URL is null");
            const res = await fetch(url, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            setData(result);
            return result;
        }catch(err: any){
            setError(err.message || "PUT failed");
        }finally {
            setLoading(false)
        }
    }

    //DELETE
    async function remove(customUrl?: string) {
        setLoading(true)
        setError(null)
        try{
            const fetchUrl = customUrl || url;
            if (!fetchUrl) throw new Error("URL is null");
            const res = await fetch(fetchUrl, {
                method: "DELETE",
            });
            const result = await res.json();
            setData(result);
            return result;
        }catch(err: any){
            setError(err.message || "DELETE failed");
        }finally {
            setLoading(false)
        }
    }
    return {data, loading, error, post, put, remove};
}

export default useFetch;

