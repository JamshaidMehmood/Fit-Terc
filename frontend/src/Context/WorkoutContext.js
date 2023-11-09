import { createContext,useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer =(state,action)=>{

    switch(action.type)
    {
        case 'SET_WORKOUT':
            return {
                workouts:action.payload
                }
        case 'CREATE_WORKOUT':
            return {
                workouts:[action.payload, ...state.workouts]
                };
        case 'DELETE_WORKOUT':
            // console.log(action.payload._id)
        return {
                workouts: state.workouts.filter((wOut) => wOut._id !== action.payload._id)
            };
        
        // case 'UPDATE_WORKOUT':
        //     return {
        //         ...state,
        //         workout:action.payload
        //         };
        default:
            return state;
            
    }
}

export const WorkoutContextProvider = ({children}) => {

    const [state , dispatch]=useReducer(workoutReducer , {
        workouts :null
    })
 
    return (
        <WorkoutContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )

}


