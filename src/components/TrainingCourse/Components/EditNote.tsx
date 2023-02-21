import React from 'react'
import { TrainingLine } from '../../../utility/interface'

interface NoteProps {
  style: any
  trainingLine: TrainingLine
  handleLineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    trainingLineId: string
  ) => void
}

const Note: React.FC<NoteProps> = ({
  style,
  trainingLine,
  handleLineChange,
}) => {
  return (
    <input
      className="form-control"
      onFocus={(e) => e.target.select()}
      maxLength={80}
      style={style.repNumberStyle}
      value={trainingLine.note}
      placeholder={'Enter note here'}
      onChange={(e) => handleLineChange(e, trainingLine._id!)}
      name="note"
    />
  )
}

export default Note
