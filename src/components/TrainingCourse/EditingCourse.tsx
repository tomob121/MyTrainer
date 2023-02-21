import React from 'react'
import RenderRepDeleteNote from './Components/RenderRepDeleteNote'
import RestTime from './Components/RestTime'
import { useState } from 'react'
import { Exercise, TrainingLine, Training } from '../../utility/interface'
import RightSideBar from './Components/RightSideBar'
import Reps from './Components/Reps'
import Note from './Components/EditNote'
import DeleteButton from './Components/DeleteButton'

interface Props {
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: any, trainingLine: TrainingLine) => void
  handleLineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    trainingLineId: string
  ) => void
  handleDelete: (id: string) => void
  isEditing: boolean
  allExercises: Exercise[]
  trainingLines: TrainingLine[]
  training: Training
  handleEdit: () => void
  addExerciseMutation: any
  handleStart: (trainingLine: TrainingLine[]) => void
}

const EditingCourse: React.FC<Props> = ({
  handleEnter,
  handleTitleChange,
  handleSelect,
  handleLineChange,
  handleDelete,
  isEditing,
  allExercises,
  training,
  trainingLines,
  handleEdit,
  addExerciseMutation,
  handleStart,
}) => {
  const style = {
    exerciseTitleStyle: {
      color: 'Black',
      fontSize: 20,
      fontWeight: 400,
    },
    repNumberStyle: {
      padding: 0,
      fontSize: 19,
      borderRadius: '3px',
      borderWidth: 1,
      textAlign: 'center',
      with: '100px',
    },
    toolTipMessage: {
      fontStyle: 'italic',
      opacity: 0.5,
    },
    h1element: {
      fontWeight: 500,
      fontSize: '39',
      borderRadius: 4,
    },
  }
  return (
    <React.Fragment>
      <h1 className="pb-5">
        <input
          onKeyDown={(e) => handleEnter(e)}
          style={style.h1element}
          maxLength={50}
          value={training?.title}
          onChange={(e) => handleTitleChange(e)}
          name="title"
        />
      </h1>
      <form className="row">
        <div className="col-8 pt-5">
          {trainingLines.map((trainingLine) => (
            <div className="row " key={trainingLine._id}>
              <div className="col-auto">
                <select
                  className=" form-control"
                  value={trainingLine.exerciseId.title}
                  onChange={(e) => handleSelect(e, trainingLine)}
                >
                  {allExercises.map((exercise) => (
                    <option key={exercise._id}>{exercise.title}</option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <Reps
                  handleLineChange={handleLineChange}
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                />
              </div>
              <div className="col-auto">
                <Note
                  handleLineChange={(e) =>
                    handleLineChange(e, trainingLine._id!)
                  }
                  style={style}
                  trainingLine={trainingLine}
                />
              </div>
              <div className="col-auto">
                <DeleteButton
                  handleDelete={handleDelete}
                  trainingLine={trainingLine}
                />
              </div>
              <div className="col-3 pb-4">
                <RestTime
                  handleFocus={(e) => e.target.select()}
                  handleLineChange={(e) =>
                    handleLineChange(e, trainingLine._id!)
                  }
                  isEditing={isEditing}
                  style={style}
                  trainingLine={trainingLine}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="col offset-2">
          <RightSideBar
            training={training}
            handleEdit={() => handleEdit()}
            handleAddExercise={addExerciseMutation.mutate}
            handleStart={() => handleStart(trainingLines)}
            isEditing={isEditing}
            id={training._id!}
          />
        </div>
      </form>
    </React.Fragment>
  )
}

export default EditingCourse
