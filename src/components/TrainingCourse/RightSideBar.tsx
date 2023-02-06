import React from 'react';
import { Button } from 'react-bootstrap';
import { Training } from '../../utility/interface';

interface Props {
  training: Training
  handleEdit: () => void,
  handleAddExercise: () => void,
  handleStart: (training: Training) => void,
  isEditing: boolean
}

const RightSideBar: React.FC<Props> = ({ 
  training,
  handleEdit,
  handleAddExercise,
  handleStart,
  isEditing }) => {

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
