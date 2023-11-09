import { WorkoutContext } from "../Context/WorkoutContext"
import { useContext } from "react"

const useWokoutContextHook = () => {
  const context=useContext(WorkoutContext)

  if (!context)
  {
    throw Error("UseContext must be used inside the workoutContextProvider")
  }

  return context
}

export default useWokoutContextHook
