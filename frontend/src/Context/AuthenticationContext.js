import { createContext,useReducer ,useEffect} from "react";

export const AuthenticationContext = createContext();

export const AuthenticationReducer = (state,action) => {

    switch(action.type)
    {
        case 'LOGIN':
            return {
                user:action.payload
                }
        case 'LOGOUT':
            return {
                user:null
                };
        default:
            return state;
            
    }
}

export const AuthenticationContextProvider = ({children}) => {

    const [state , dispatch]=useReducer(AuthenticationReducer , {
        user :null
    })

    useEffect(() => {
        const user = localStorage.getItem("user")
        //console.log("---------------------" + user)

        if (user) {
          dispatch({ type: "LOGIN", payload: user })
        }
      },[])

    // console.log("Authentication Provider :" , state)

    return (
        <AuthenticationContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthenticationContext.Provider>
    )
}


