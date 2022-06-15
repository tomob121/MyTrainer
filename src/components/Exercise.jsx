import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraining } from './../service/fakeTrainingCourses';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
  const { id } = useParams();
  const [training] = useState(getTraining(parseInt(id)));
  const [exerciseStage, setExerciseStage] = useState(0);
  const [isRenderingRest, setIsRenderingRest] = useState(false);
  let [countDown, setContDown] = useState(
    training.trainingLines.map((line) => {
      return { id: line.id, restTime: line.restTime };
    })
  );

  let navigate = useNavigate();

  function nextExercise() {
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(!isRenderingRest);
  }

  function nextExerciseSkipRest() {
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(false);
  }

  function handlecountdown() {
    setTimeout(() => {
      setContDown([...countDown]);
      countDown[exerciseStage].restTime -= 0.5;
      if (countDown[exerciseStage].restTime <= -1) nextExercise();
    }, 1000);
  }

  return (
    <Container>
      <div className='row'>
        <div className='col-5'></div>
        {isRenderingRest ? (
          <div className='row col-3 mt-5'>
            <div className='col-auto'>
              Rest
              {handlecountdown()}
            </div>
            <div className='col-auto'>{countDown[exerciseStage].restTime}</div>
          </div>
        ) : (
          <div className='row col-3 mt-5'>
            <div className='col-auto'>
              {training.trainingLines[exerciseStage].exercise.title}
            </div>
            <div className='pl-1 col-auto'>
              {training.trainingLines[exerciseStage].reps}
            </div>
          </div>
        )}

        <div className='col-auto mt-5'>
          <div className='col-auto'>
            <Button onClick={() => nextExerciseSkipRest()}>Skip rest</Button>
          </div>
          <div className='col-auto mt-2'>
            <Button
              onClick={
                isRenderingRest
                  ? () => nextExercise()
                  : () => setIsRenderingRest(!isRenderingRest)
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Exercise;