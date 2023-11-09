import React from 'react';
import './WorkoutForm.css'; // Import your CSS file
import { useState } from 'react';
// importing custom hook to manage the contex state 
import useWokoutContextHook from "../Hooks/useWokoutContextHook"
import useAuthenticationContextHook from "../Hooks/useAuthenticationContextHook"


const WorkoutForm = () => {

  const {user}=useAuthenticationContextHook()

  //using custom made hook
  const { dispatch } = useWokoutContextHook();
  //--------------------------------------------
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  // for checking empty
  const [emptyField, setEmptyFields] = useState([]);

 
  const onsubmitHandeler = async (e) => {
    e.preventDefault()

    // if user not logged in
    if (!user)
    {
      setError("Please Login First")
      setTimeout(() => setError(''), 3000);
      return
    }

    const workout = { title, load, reps }

    const res = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user.token}`
      },
      body: JSON.stringify(workout)
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) {
      setError(data.error);
      // for disappearing the error message after 3 seconds
      setTimeout(() => setError(''), 3000);
      // console.log(data.emptyFields)
      // console.log("///////////")
      
      setEmptyFields(data.emptyFields);
    }
    if (res.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError('Exercise Added Success Fully')
      // for disappearing the error message after 3 seconds
      setTimeout(() => setError(''), 3000);
      setEmptyFields([])
      // --calling dispatch function
      dispatch({ type: "CREATE_WORKOUT", payload: data })
    }
  }


  return (
    <form onSubmit={onsubmitHandeler}>
      <div className="workout-form-container">
        <h1 className="form-title">Workout Form</h1>
        <div className="input-container">
          <label className="input-label">Exercise Title :</label>
          <input
            type="text"
            placeholder='Enter exercise title'
            onChange={(e) =>
              setTitle(e.target.value)}
            value={title}
            className={emptyField && emptyField.includes('title') ? 'error' : ''}
          />
        </div>

        <div className="input-container">
          <label className="input-label">Load (KG) :</label>
          <input
            type="number"
            onChange={(e) =>
              setLoad(e.target.value)}
            value={load}
            className={emptyField && emptyField.includes('load') ? 'error' : ''}
          />
        </div>

        <div className="input-container">
          <label className="input-label">Reps :</label>
          <input
            type="number"
            onChange={(e) =>
              setReps(e.target.value)}
            value={reps}
            className={emptyField && emptyField.includes('reps') ? 'error' : ''}
          />
        </div>

        <button className="add-button">Add Workout</button>
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
};

export default WorkoutForm;
