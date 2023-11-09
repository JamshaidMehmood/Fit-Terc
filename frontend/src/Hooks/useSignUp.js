import { useState } from "react";
import { AuthenticationContext } from "../Context/AuthenticationContext"

import { useContext } from "react";



export const useSignUp = () => {

  

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const {dispatch} = AuthenticationContext()
    const { dispatch } = useContext(AuthenticationContext);


    const signUp = async (email, password) => {
        // console.log(email)
        // console.log(password)
        
        if (email && password) {
            setIsLoading(true)
            try {
                const response = await fetch("/api/users/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    })
                    // console.log(response)
                    // console.log("........")

                const data = await response.json()
                console.log(data)

                if (!response.ok) {
                    setIsLoading(false)
                    setError(data.error)
                }

                if (response.ok) {
                    setIsLoading(false)
                    dispatch({ type: "LOGIN", payload: data })
                    // console.log(JSON.stringify(data))
                    localStorage.setItem("user", JSON.stringify(data))
                    setError(null)
                }
            }
            catch (er) {
                setIsLoading(false)
                setError(er.message)
            }
        }
        else {
            setError("Please enter email and password")
        }
    

}

return [signUp, isLoading, error]

}


