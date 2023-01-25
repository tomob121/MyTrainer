import React from 'react';

const RenderRestTime = ({
  handleFocus,
  isEditing,
  style,
  trainingLine,
  handleLineChange,
}) => {
  return (
    <div className='row'>
      {isEditing ? (
        <div>
          Rest time:
          <input
            onFocus={handleFocus}
            className='col-1 m-1 '
            style={style.repNumberStyle}
            min={0}
            type={'number'}
            max={999}
            value={trainingLine.restTime}
            onChange={(e) => handleLineChange(e, trainingLine.id, 'restTime')}
          />
        </div>
      ) : (
        <div className='row pt-1'>
          <div className='col-auto'>Rest Time: {trainingLine.restTime}</div>
          <div className='col-auto' style={style.toolTipMessage}>
            Seconds
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderRestTime;
