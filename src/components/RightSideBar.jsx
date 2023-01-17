import React from 'react';
import { Button } from 'react-bootstrap';

const RightSideBar = (props) => {
  const { training, handleEdit, handleAddExercise, handleStart, isEditing } =
    props;

  return (
    <div className='col-3'>
      <div>
        <Button
          className='col-5 m-1'
          onClick={() => handleEdit()}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
      <div className='col-auto'>
        {isEditing ? (
          <Button
            onClick={() => handleAddExercise()}
            style={{ color: 'white' }}
            className='btn btn-secondary m-1 col-5'
          >
            Add Exercise
          </Button>
        ) : (
          <Button
            onClick={() => handleStart(training)}
            className='col-5 m-1 btn-success'
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
