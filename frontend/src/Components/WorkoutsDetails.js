import "./WorkoutsDetails.css"
import useWokoutContextHook from "../Hooks/useWokoutContextHook"
// date-fns
import fromatDistanceToNow from "date-fns/formatDistanceToNow"
// for special icons
import { FaTrash } from 'react-icons/fa';
import useAuthenticationContextHook from "../Hooks/useAuthenticationContextHook"




const WorkoutsDetails = ({ workout }) => {

  const {user}=useAuthenticationContextHook()

  const { dispatch } = useWokoutContextHook()

  const onClickHandler = async () => {

    if (!user)
    {
      return
    }

    console.log("Clicked delete")
    const res = await fetch('/api/workouts/'+ workout._id ,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${user.token}`
        }
      })
    const data = await res.json()

    console.log("/////")
    console.log(data)
    
    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data.result })
    }
  }

    return (
      <div>
        <div className="workout-details">
          <h2>{workout.title}</h2>
          <p><strong>Load: </strong> {workout.load}</p>
          <p><strong>Reps: </strong> {workout.reps}</p>
          <h4>{fromatDistanceToNow(new Date(workout.createdAt),{addSuffix : true})}</h4>
          <button className="btn" onClick={onClickHandler}> <FaTrash /></button>
        </div>
      </div>
    )
  }
export default WorkoutsDetails
