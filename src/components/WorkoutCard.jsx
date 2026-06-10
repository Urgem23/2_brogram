import React, { useState } from 'react'
import Modal from './Modal'
import { exerciseDescriptions } from '../utils'


export default function WorkoutCard(props) {
    const {trainingPlan, workoutIndex, type, dayNum, icon, savedWeight,
        handleSave, handleComplete } = props

    const { warmup, workout } = trainingPlan || {} /* in the case that trainingPlan were indefined, || {} would avoid an error
     because it would access the empty object {} instead */

    const [showExerciseDescription, setShowExerciseDescription] = useState(null)  // making the showExerciseDescription a statefullvariable, for the modal overlay to be able to display differents contents
    //const showExerciseDescription = { name: 'absdhj', description: 'nklcsnd'}

    const [weights, setWeights] = useState(savedWeight || {})
    
    function handleAddWeight (title, weight) {
        console.log(title, weight) //this is what get called every time a value of an input changes
        const newObj = {
            ...weights,
            [title]: weight  // dynamic key [title]
        }
        setWeights(newObj)
    }

    {/*About the handleAddWeight() function above : Since we can‘t change the state of the variable weights directly,
     we create a new object by copying the old weights content, then we add
     the modification (the new weight value of the corresponding exercise) and pass that new object to 
     the setter  for it to modify the state. */}

     return (
        <div className="workout-container">
           { showExerciseDescription && (
            <Modal showExerciseDescription={showExerciseDescription}  
            handleCloseModal={() => {
                setShowExerciseDescription(null)
            }}/>) }
            <div className="workout-card card"> {/* the second card here is a FantaCSS style */}
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} Workout</b></h2>
                </div>
            </div>

        <div className="workout-grid">
            <div className="exercise-name">
                <h4>Warmup</h4>
            </div>
            <h6>Sets</h6>
            <h6>Reps</h6>
            <h6 className="weight-input">Max weight</h6>
            {warmup.map((warmupExercise, warmupIndex) => {
                return(
                    <React.Fragment key={warmupIndex}>
                        <div className='exercise-name'>
                            <p>{warmupIndex + 1 }. {warmupExercise.name}</p>
                            <button onClick={ () => {
                                setShowExerciseDescription({
                                    name: warmupExercise.name,
                                    description: exerciseDescriptions [warmupExercise.name] /*the object exerciseDescription in the index.js file is built that the key an element (in this case of a description) ist the name of the corresponding exercise*/
                                })
                            }} className='help-icon'>
                                <i className='fa-regular fa-circle-question' />
                            </button>
                        </div>
                        <p className='exercise-info'>{warmupExercise.sets}</p>
                        <p className='exercise-info'>{warmupExercise.reps}</p>
                        <input className='weight-input' placeholder='N/A' disabled /> {/* the reason of the 'disabled' attribut here is that there is not going to be a weight-input for the warmups, only for the workouts*/}
                    </React.Fragment>
                )
            })}
        </div>  
        <div className="workout-grid">
            <div className="exercise-name">
                <h4>Workout</h4>
            </div>
            <h6>Sets</h6>
            <h6>Reps</h6>
            <h6 className="weight-input">Max weight</h6>
            {workout.map((workoutExercise, wIndex) => {
                return(
                    <React.Fragment key={wIndex}>
                        <div className='exercise-name'>
                            <p>{wIndex + 1 }. {workoutExercise.name}</p>
                             <button onClick={ () => {
                                setShowExerciseDescription({
                                    name: workoutExercise.name,
                                    description: exerciseDescriptions [workoutExercise.name] /*the object exerciseDescription in the index.js file is built that the key an element (in this case of a description) ist the name of the corresponding exercise*/
                                })
                            }} className='help-icon'>
                                <i className='fa-regular fa-circle-question' />
                            </button>
                        </div>
                        <p className='exercise-info'>{workoutExercise.sets}</p>
                        <p className='exercise-info'>{workoutExercise.reps}</p>
                        <input value={weights[workoutExercise.name] || ''}
                        onChange={(e) => {
                            handleAddWeight(workoutExercise.name, e.target.value)
                        }} className='weight-input' placeholder='14'/> 
                    </React.Fragment>    
                )
            })}
        </div>  
        
        <div className='workout-buttons'>
            <button onClick={() => {
                handleSave(workoutIndex, {weights})
            }}>Save & Exit</button>
            <button onClick={() => {
                handleComplete(workoutIndex, {weights})
            }} disabled={Object.keys(weights).length !== workout.length}>Complete</button>
        </div>

        </div>
    )
}