import * as React from 'react'
import { useState, useRef } from 'react'
import { Training, TrainingLine } from '../../utility/interface'
import RestTime from './Components/RestTime'
import Reps from './Components/Reps'
import RightSideBar from './Components/RightSideBar'
import DisplayNote from './Components/DisplayNote'

interface DisplayCourseProps {
  training: Training
  trainingLines: TrainingLine[]
  style: any
  isEditing: boolean
  handleLineChange: (e: any, trainingLineId: string) => void
  handleEdit: () => void
  addExerciseMutation: any
  handleStart: (trainingLines: TrainingLine[]) => void
  id: string
}

const DisplayCourse: React.FC<DisplayCourseProps> = ({
  training,
  trainingLines,
  style,
  isEditing,
  addExerciseMutation,
  handleEdit,
  handleLineChange,
  handleStart,
  id,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [trainingLineForNote, setTrainingLineForNote] = useState<TrainingLine>()
  let currentEvent = useRef<React.MouseEvent<HTMLDivElement, MouseEvent>>()

  function displayNote(trainingLine: TrainingLine) {
    if (trainingLine._id === trainingLineForNote?._id) {
      return (
        <DisplayNote
          x={currentEvent.current?.clientX!}
          y={currentEvent.current?.clientY!}
          trainingLineNote={trainingLine.note}
        />
      )
    }
    return null
  }

  return (
    <React.Fragment>
      <h1 className="pb-5">{training?.title}</h1>
      <div className="row">
        <div className="col-8 pt-5">
          {trainingLines.map((trainingLine) => (
            <div className="row p-2" key={trainingLine._id}>
              <div className="col" style={style.exerciseTitleStyle}>
                {trainingLine.exerciseId.title}
              </div>
              <div className="col">
                <Reps
                  handleLineChange={handleLineChange}
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                />
              </div>
              <div className="col">
                {isHovering && displayNote(trainingLine)}
                {trainingLine.note && (
                  <div
                    className="noteHover"
                    onMouseOver={(e) => {
                      setIsHovering(true)
                      setTrainingLineForNote(trainingLine)
                      currentEvent.current = e
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Note
                  </div>
                )}
              </div>
              <RestTime
                isEditing={isEditing}
                style={style}
                trainingLine={trainingLine}
                handleFocus={(e) => e.target.select()}
                handleLineChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLineChange(e, trainingLine._id!)
                }
              />
            </div>
          ))}
        </div>
        <div className="col">
          <RightSideBar
            training={training}
            handleEdit={handleEdit}
            handleAddExercise={addExerciseMutation.mutate}
            handleStart={() => handleStart(trainingLines)}
            isEditing={isEditing}
            id={id!}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default DisplayCourse
