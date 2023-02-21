import * as React from 'react'
import { TrainingLine } from '../../../utility/interface'

interface RepsProps {
  style: any
  trainingLine: TrainingLine
  isEditing: boolean
  handleLineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    trainingLineId: string
  ) => void
}

const Reps: React.FC<RepsProps> = ({
  style,
  trainingLine,
  handleLineChange,
  isEditing,
}) => {
  if (isEditing)
    return (
      <input
        className="form-control"
        onFocus={(e) => e.target.select()}
        min={0}
        type={'number'}
        max={999}
        style={style.repNumberStyle}
        key={trainingLine._id}
        onChange={(e) => handleLineChange(e, trainingLine._id!)}
        value={trainingLine.reps}
        name="reps"
      />
    )

  return (
    <div className="row">
      <div className="col-auto" style={style.repNumberStyle}>
        {trainingLine.reps}
      </div>
      <div className="col" style={style.toolTipMessage}>
        {trainingLine.exerciseId.type &&
        trainingLine.exerciseId.type.toLowerCase() === 'endure'
          ? 'Seconds'
          : 'Reps'}
      </div>
    </div>
  )
}

export default Reps
