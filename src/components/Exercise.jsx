import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Exercise = ({ trainingsProps }) => {
  const { id } = useParams();
  const [training, setTrainig] = trainingsProps.filter(
    (training) => training.id === parseInt(id)
  );
  const [exerciseStage, setExerciseStage] = useState(0);
  const [isRenderingRest, setIsRenderingRest] = useState(false);
  let [countDown, setContDown] = useState(
    training.trainingLines.map((line) => {
      return { id: line.id, restTime: line.restTime };
    })
  );
  let [timer, setTimer] = useState(0);

  const styles = {
    paragraphBorder: {
      border: 2,
      borderStyle: 'solid',
      borderColor: 'DarkSlateGrey',
      height: 52,
      backgroundColor: 'HoneyDew',
      color: 'black',
      borderRadius: 5,
    },
  };

  let navigate = useNavigate();

  function handleTimer() {
    setTimeout(() => {
      training.timer[training.timer.length - 1] += 1;
      setTimer((timer += 1));
    }, 1000);
  }

  function nextExercise() {
    if (exerciseStage === countDown.length - 1)
      navigate(`/trainingCourses/${id}/end`);
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(!isRenderingRest);
  }

  function nextExerciseSkipRest() {
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(false);
  }

  function handlecountdown() {
    if (isRenderingRest) {
      setTimeout(() => {
        setContDown([...countDown]);
        countDown[exerciseStage].restTime -= 1;
        if (countDown[exerciseStage].restTime <= -1) nextExercise();
        return;
      }, 1000);
    }
  }
  useEffect(() => handleTimer(), [timer]);
  useEffect(() => handlecountdown(), [countDown, isRenderingRest]);

  return (
    <Container>
      <div className='row'>
        <div className='col-5'></div>
        {isRenderingRest ? (
          <div className='row col-3 mt-5'>
            <div className='col-auto'>Rest</div>
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
      {isRenderingRest ? (
        ''
      ) : (
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-3'>
            {training.trainingLines[exerciseStage].note.length === 0 ? (
              ''
            ) : (
              <p style={styles.paragraphBorder}>
                {training.trainingLines[exerciseStage].note}
              </p>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Exercise;
