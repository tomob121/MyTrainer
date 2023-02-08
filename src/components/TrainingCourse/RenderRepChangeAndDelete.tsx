import React from 'react'
import { Button } from 'react-bootstrap'
import { TrainingLine } from './../../utility/interface'

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

const RenderRepChangeAndDelete: React.FC<Props> = ({
    isEditing,
    style,
    trainingLine,
    handleFocus,
    handleLineChange,
    handleDelete,
}) => {
    return (
        <div className="col-auto row">
            {isEditing ? (
                <div className="row">
                    <div className="col-auto">
                        <input
                            onFocus={handleFocus}
                            min={0}
                            type={'number'}
                            max={999}
                            style={style.repNumberStyle}
                            key={trainingLine._id}
                            onChange={(e) =>
                                handleLineChange(e, trainingLine._id)
                            }
                            value={trainingLine.reps}
                            name="reps"
                        />
                        <Button
                            onClick={() => handleDelete(trainingLine._id)}
                            style={{ marginLeft: 30 }}
                            className="btn-danger"
                        >
                            Delete
                        </Button>
                    </div>
                    <div className="col-2">
                        <input
                            onFocus={handleFocus}
                            maxLength={80}
                            style={style.repNumberStyle}
                            value={trainingLine.note}
                            placeholder={'Enter note here'}
                            onChange={(e) =>
                                handleLineChange(e, trainingLine._id)
                            }
                            name="note"
                        />
                    </div>
                </div>
            ) : (
                <div className="col-auto row">
                    <div className="col-auto" style={style.repNumberStyle}>
                        {trainingLine.reps}
                    </div>
                </div>
            )}
            {isEditing ? (
                ''
            ) : (
                <div className="col-auto pt-1" style={style.toolTipMessage}>
                    {trainingLine.exerciseId.type &&
                    trainingLine.exerciseId.type.toLowerCase() === 'endure'
                        ? 'Seconds'
                        : 'Reps'}
                </div>
            )}
        </div>
    )
}

export default RenderRepChangeAndDelete
