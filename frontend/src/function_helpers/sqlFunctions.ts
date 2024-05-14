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
    const entryjson = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(entryjson.body))
        
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
export async function getEntries(url: string, authToken:string){
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`
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
        const entryjson = await response.json();
    
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
