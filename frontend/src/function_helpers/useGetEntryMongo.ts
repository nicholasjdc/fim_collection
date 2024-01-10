import { useState, useEffect } from "react";
import { getEntry } from "./mongoFunctions";
import { BookEntry } from "../screen_helpers/BookEntry";
const useGetEntryMongo= (id:string) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<BookEntry>(null);

    useEffect(()=> {
        const abortCont = new AbortController(); 


        getEntry(id)
            .then(res => {
                if(!res){ 
                    throw Error('could not fetch data for that resource');
                }
                return res
            })
            .then(data =>{ 
                    const be:BookEntry = data
                    setData(be)
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
    }, [id]); 

    return {data, isPending, error};
}
 
export default useGetEntryMongo;