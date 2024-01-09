const API_URL='http://localhost:4000/api/film-entries'
export async function postEntry(entryBody: {}){

    const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(entryBody),
    headers: {
        "Content-Type": "application/json",
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
export async function getEntry(id: string){
    const response = await fetch(API_URL +'/'+ id, {
        method: "GET",
        headers: {
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
export async function getEntries(searchBody: {}, pageNumber: number){
    const response = await fetch(API_URL, {
        method: "GET",
        body: JSON.stringify(searchBody),
        headers: {
            "Content-Type": "application/json",

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
export async function updateEntry(entryBody: {}){
    const response = await fetch(API_URL, {
        method: "PATCH",
        body: JSON.stringify(entryBody),
        headers: {
            "Content-Type": "application/json",

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
export async function deleteEntry(id: string){
    const response = await fetch(API_URL +'/'+ id, {
        method: "DELETE",
        headers: {
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
