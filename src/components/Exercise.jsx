import React, { useState, useEffect } from 'react';
import { getTrainingLine } from '../service/trainingLineService';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import CountDown from './CountDown';

function Exercise() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [trainingLines, setTrainingLines] = useState({});
  const [exerciseStage, setExerciseStage] = useState(0);
  const [isRenderingRest, setIsRenderingRest] = useState(false);
  const [countDown, setCountDown] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTrainingLine(id);
      setTrainingLines(data);
      setIsLoading(false);
      setCountDown(data[exerciseStage].restTime);
    };
    fetchData();
    return () => {
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    if (isRenderingRest) {
      setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }
  }, [countDown, exerciseStage]);

  function nextExercise() {
    if (exerciseStage === trainingLines.length - 1)
      navigate(`/trainingCourses/${id}/end`);
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(!isRenderingRest);
    reduceTimer();
  }

  function nextExerciseSkipRest() {
    if (exerciseStage === trainingLines.length - 1)
      navigate(`/trainingCourses/${id}/end`);
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(false);
  }

  function reduceTimer() {
    setTimeout(() => setCountDown(countDown - 1), 1000);
  }

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
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <div className='row'>
        <div className='col-5'></div>
        {isRenderingRest ? (
          <div className='row col-3 mt-5'>
            <div className='col-auto'>Rest</div>
            <div className='col-auto'>
              <CountDown time={trainingLines[exerciseStage].restTime} nextExercise={() => nextExercise()} />
            </div>
          </div>
        ) : (
          <div className='row col-3 mt-5'>
            <div className='col-auto'>
              {trainingLines[exerciseStage].exerciseId.title}
            </div>
            <div className='pl-1 col-auto'>
              {trainingLines[exerciseStage].reps}
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
      {!isRenderingRest && (
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-3'>
            {trainingLines[exerciseStage].note.length === 0 ? (
              ''
            ) : (
              <p style={styles.paragraphBorder}>
                {trainingLines[exerciseStage].note}
              </p>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

export default Exercise;
