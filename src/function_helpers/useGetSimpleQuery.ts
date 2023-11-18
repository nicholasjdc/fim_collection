import { useState, useEffect } from "react";
import { queryEntriesByKeywords } from "./personalFirebase";
import { BookEntry } from "../screen_helpers/BookEntry";

const useGetSimpleQuery= (keyword:String) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<BookEntry[] | null>(null);
    useEffect(()=> {
        const abortCont = new AbortController(); 


            queryEntriesByKeywords(keyword)
            .then(res => {
                if(!res){ 
                    throw Error('could not fetch data for that resource');
                }
                return res
            })
            .then(data =>{ 
                    setData(data as BookEntry[])
                    setIsPending(false)
                    setError(null);
            }
           
        )
        .catch(err=>{ 
            if(err.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
                setIsPending(false);
                setError(err.message);
            }
        })
        console.log('use effect ran');

    
    return () => abortCont.abort(); 
    }, []); 

    return {data, isPending, error};
}
 
export default useGetSimpleQuery;