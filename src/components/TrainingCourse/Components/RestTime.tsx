import React from 'react'
import { TrainingLine } from '../../../utility/interface'

interface Props {
  handleFocus: (e: React.ChangeEvent<HTMLInputElement>) => void
  isEditing: boolean
  style: any
  trainingLine: TrainingLine
  handleLineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => void
}

const RestTime: React.FC<Props> = ({
  handleFocus,
  isEditing,
  style,
  trainingLine,
  handleLineChange,
}) => {
  if (isEditing)
    return (
      <div>
        Rest time:
        <input
          onFocus={handleFocus}
          className="m-1 numberInput"
          min={0}
          type={'number'}
          max={999}
          value={trainingLine.restTime}
          onChange={(e) => handleLineChange(e, trainingLine._id!)}
          name="restTime"
        />
      </div>
    )

  return (
    <div className="row  pt-1 ">
      <div className="col-auto">Rest Time: {trainingLine.restTime}</div>
      <div className="col restTime">Seconds</div>
    </div>
  )
}

export default RestTime
