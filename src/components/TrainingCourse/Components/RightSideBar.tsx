import React from 'react'
import { Button } from 'react-bootstrap'
import { Training } from '../../../utility/interface'
import { UpdateTrainingLine } from '../../../utility/interface'

interface Props {
  training: Training
  handleEdit: () => void
  handleAddExercise: (trainingLine: UpdateTrainingLine) => void
  handleStart: (training: Training) => void
  isEditing: boolean
  id: string
}

const RightSideBar: React.FC<Props> = ({
  training,
  handleEdit,
  handleAddExercise,
  handleStart,
  isEditing,
  id,
}) => {
  return (
    <div className="btn-group-vertical">
      <Button className="button btn btn-primary " onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      {isEditing ? (
        <Button
          className="btn btn-secondary button"
          onClick={() =>
            handleAddExercise({
              trainingId: id,
              exerciseId: '6384a9c95cc12ea42d040af2',
              reps: 0,
              restTime: 0,
              note: '',
            })
          }
        >
          Add Exercise
        </Button>
      ) : (
        <Button
          onClick={() => handleStart(training)}
          className="btn btn-success button"
        >
          Start
        </Button>
      )}
    </div>
  )
}

export default RightSideBar
