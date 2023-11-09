import { AuthenticationContext } from "../Context/AuthenticationContext"
import { useContext } from "react"

const useAuthenticationContextHook = () => {
  const context=useContext(AuthenticationContext)

  if (!context)
  {
    throw Error("UsebAuthentication must be used inside the workoutContextProvider")
  }

  return context
}

export default useAuthenticationContextHook
