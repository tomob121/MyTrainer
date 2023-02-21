import React from 'react'
import { Button } from 'react-bootstrap'
import { TrainingLine } from '../../../utility/interface'

interface Props {
  isEditing: boolean
  style: any
  trainingLine: TrainingLine
  handleFocus: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => void
  handleDelete: (e: any) => void
}

const RenderRepDeleteNote: React.FC<Props> = ({
  isEditing,
  style,
  trainingLine,
  handleFocus,
  handleLineChange,
  handleDelete,
}) => {
  return (
    <>
      {isEditing ? (
        <div className="row row-cols-3 ">
          <div className="col m-1">
            <input
              onFocus={handleFocus}
              min={0}
              type={'number'}
              max={999}
              style={style.repNumberStyle}
              key={trainingLine._id}
              onChange={(e) => handleLineChange(e, trainingLine._id!)}
              value={trainingLine.reps}
              name="reps"
            />
          </div>
          <div className="col">
            <Button
              onClick={() => handleDelete(trainingLine._id)}
              style={{ marginLeft: 30 }}
              className="btn-danger"
            >
              Delete
            </Button>
          </div>
          <div className="col">
            <input
              className=""
              onFocus={handleFocus}
              maxLength={80}
              style={style.repNumberStyle}
              value={trainingLine.note}
              placeholder={'Enter note here'}
              onChange={(e) => handleLineChange(e, trainingLine._id!)}
              name="note"
            />
          </div>
        </div>
      ) : (
        <div className="">
          <div className="col">
            <div style={style.repNumberStyle}>{trainingLine.reps}</div>
          </div>
          <div style={style.toolTipMessage}>
            {trainingLine.exerciseId.type &&
            trainingLine.exerciseId.type.toLowerCase() === 'endure'
              ? 'Seconds'
              : 'Reps'}
          </div>
        </div>
      )}
    </>
  )
}

export default RenderRepDeleteNote
