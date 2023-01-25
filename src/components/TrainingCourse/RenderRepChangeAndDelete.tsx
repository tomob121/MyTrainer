import React from 'react';
import { Button } from 'react-bootstrap';

const RenderRepChangeAndDelete = ({
  isEditing,
  style,
  trainingLine,
  handleFocus,
  handleLineChange,
  handleDelete,
}) => {
  return (
    <div className='col-auto row'>
      {isEditing ? (
        <div className='row'>
          <div className='col-auto'>
            <input
              onFocus={handleFocus}
              min={0}
              type={'number'}
              max={999}
              style={style.repNumberStyle}
              key={trainingLine._id}
              onChange={(e) => handleLineChange(e, trainingLine._id, 'reps')}
              value={trainingLine.reps}
            />
            <Button
              onClick={(e) => handleDelete(trainingLine)}
              style={{ marginLeft: 30 }}
              className='btn-danger'
            >
              Delete
            </Button>
          </div>
          <div className='col-2'>
            <input
              onFocus={handleFocus}
              maxLength='80'
              style={style.repNumberStyle}
              value={trainingLine.note}
              placeholder={'Enter note here'}
              onChange={(e) => handleLineChange(e, trainingLine._id, 'note')}
            />
          </div>
        </div>
      ) : (
        <div className='col-auto row'>
          <div className='col-auto' style={style.repNumberStyle}>
            {trainingLine.reps}
          </div>
        </div>
      )}
      {isEditing ? (
        ''
      ) : (
        <div className='col-auto pt-1' style={style.toolTipMessage}>
          {trainingLine.exerciseId.type &&
          trainingLine.exerciseId.type.toLowerCase() === 'endure'
            ? 'Seconds'
            : 'Reps'}
        </div>
      )}
    </div>
  );
};

export default RenderRepChangeAndDelete;