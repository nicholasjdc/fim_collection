import { useAuthContext } from "./useAuthContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    
    const logout = () =>{
        // no need to remove user from database, local state keeps in minde
        // remove user from storage
        localStorage.removeItem('user')

        //dispatch logout
        dispatch({type: "LOGOUT"})
    }

    return {logout}
}