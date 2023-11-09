//import { useEffect, useState } from "react"
import { useEffect} from "react"
import  "./Home.css"
import WorkoutsDetails from "../Components/WorkoutsDetails"
import WorkoutForm from "../Components/WorkoutForm"
//importing custome hook
import useWokoutContextHook from "../Hooks/useWokoutContextHook"
import useAuthenticationContextHook from "../Hooks/useAuthenticationContextHook"

const Home = () => {
  //const [workouts, setWorkouts] = useState(null)
  //using custom made hook now instead of local state management
  const {workouts,dispatch}=useWokoutContextHook()
  const {user} = useAuthenticationContextHook()


  useEffect(() => {
    // console.log("HI")
    const fetchWorkout = async () => {
      const res = await fetch('/api/workouts',{
      headers:{
        'Authorization' : `Bearer ${user.token}`
      }
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
      //  setWorkouts(data)
      dispatch({type:"SET_WORKOUT" , payload :data})
      }
    }

    if (user)
    {
      fetchWorkout()
    }
  }, [dispatch,user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutsDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <div className="form-container">
        <WorkoutForm />
      </div>
    </div>

  )
}

export default Home
