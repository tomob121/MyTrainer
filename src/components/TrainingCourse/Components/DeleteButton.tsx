import * as React from 'react'
import { Button } from 'react-bootstrap'
import { TrainingLine } from '../../../utility/interface'

interface DeleteButtonProps {
  handleDelete: (trainingLineId: string) => void
  trainingLine: TrainingLine
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  handleDelete,
  trainingLine,
}) => {
  return (
    <div>
      <Button
        onClick={() => handleDelete(trainingLine._id!)}
        style={{ marginLeft: 30 }}
        className="btn-danger"
      >
        Delete
      </Button>
    </div>
  )
}

export default DeleteButton
