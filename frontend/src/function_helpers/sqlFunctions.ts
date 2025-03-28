import { BookEntry } from "../screen_helpers/BookEntry";
import { API_URL} from "./handyVariables";

export async function postEntry(entryBody: {}, authToken:string){
    
    const response = await fetch(API_URL + 'film-entries', {
    method: "POST",
    body: JSON.stringify(entryBody),
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`

    },
    });
    console.log(response)
    const entryjson = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(entryjson.error))
        
    }
    if (response.ok) {
        return entryjson.body;
    }

}
export async function getEntry(id: string, authToken:string){
    const response = await fetch(API_URL +'film-entries/'+ id, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`

        },
        });
        const entryjson = await response.json();
    
        if (!response.ok) {
            throw Error(JSON.stringify(entryjson.body))
            
        }
        if (response.ok) {
            return entryjson;
        }
    
}
export async function getEntries(url: string, authToken:string, refreshToken:string){
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'accessToken': `Bearer ${authToken}`,
            'refreshToken': `Bearer ${refreshToken}`
        },
        });
        const entryjson = await response.json();
        console.log(entryjson)
        if (!response.ok) {
            throw Error(JSON.stringify(entryjson.body))
            
        }
        if (response.ok) {
            return entryjson;
        }
    
}
export async function patchEntry(url: string, entryBody: {}, authToken: string){
    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(entryBody),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`

        },
        });
        const entryjson = response
        console.log("WAOH FUNCTION")
        console.log(entryjson)
        if (!response.ok) {
            throw Error(JSON.stringify(entryjson.body))
            
        }
        if (response.ok) {
            return entryjson;
        }
    
}
export async function deleteEntry(id: string, authToken:string){
    const response = await fetch(API_URL +'film-entries/'+ id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
        },
        });
        const entryjson = await response.json();
    
        if (!response.ok) {
            throw Error(JSON.stringify(entryjson.body))
            
        }
        if (response.ok) {
            return entryjson;
        }
    
}
export async function getHighestEntryNumber(authToken: string){
    const response = await fetch(API_URL +'film-entries/getGreatestEntryCode', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
        },
        });
        const entryjson = await response.json();
    
        if (!response.ok) {
            throw Error(JSON.stringify(entryjson.body))
            
        }
        if (response.ok) {
            return entryjson;
        }
}
export async function getGoogleTokens(code){
    const response = await fetch(API_URL +'user/google/auth', {
        method: "POST",
        body: code,
        headers: {
            "Content-Type": "application/json"
        }
    })
    const tokenJSON = await response.json();
    
        if (!response.ok) {
            throw Error(JSON.stringify(tokenJSON))
            
        }
        if (response.ok) {
            return tokenJSON;
        }
}
/*
SELECT pro_id, pro_name, pro_price, pro_quantity
FROM product_details
WHERE pro_quantity = ( SELECT 
MAX(pro_quantity) 
FROM product_details);
 */
