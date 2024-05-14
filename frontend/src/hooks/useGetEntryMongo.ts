import { useState, useEffect } from "react";
import { getEntry } from "../function_helpers/sqlFunctions";
import { BookEntry } from "../screen_helpers/BookEntry";
import { useAuthContext } from "./useAuthContext";
const useGetEntryMongo= (id:string) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<BookEntry>(null);
    const {user} = useAuthContext();
    useEffect(()=> {
        if(!user){
            return
        }
        const abortCont = new AbortController(); 


        getEntry(id, user.token)
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
    }, [id, user]); 

    return {data, isPending, error};
}
 
export default useGetEntryMongo;