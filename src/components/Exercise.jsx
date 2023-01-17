import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { getTrainingLine } from '../service/trainingLineService';
import { getTraining } from '../service/trainingService';

function Exercise() {
  const { id } = useParams();
  const [trainingLines, setTrainingLines] = useState({});
  const [exerciseStage, setExerciseStage] = useState(0);
  const [isRenderingRest, setIsRenderingRest] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: trainingLine } = await getTrainingLine(id);
      setTrainingLines(trainingLine[exerciseStage]);
    };
    fetchData();
  }, [exerciseStage, id]);

  useEffect(() => {}, [exerciseStage]);

  function nextExercise() {
    if (exerciseStage === trainingLines.length - 1)
      navigate(`/trainingCourses/${id}/end`);
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(!isRenderingRest);
  }

  function nextExerciseSkipRest() {
    if (exerciseStage === trainingLines.length - 1)
      navigate(`/trainingCourses/${id}/end`);
    setExerciseStage(exerciseStage + 1);
    setIsRenderingRest(false);
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

  try {
    return (
      <Container>
        <div className='row'>
          <div className='col-5'></div>
          {isRenderingRest ? (
            <div className='row col-3 mt-5'>
              <div className='col-auto'>Rest</div>
              <div className='col-auto'>{trainingLines.restTime}</div>
            </div>
          ) : (
            <div className='row col-3 mt-5'>
              <div className='col-auto'>{trainingLines.exerciseId.title}</div>
              <div className='pl-1 col-auto'>{trainingLines.reps}</div>
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
              {trainingLines.note.length === 0 ? (
                ''
              ) : (
                <p style={styles.paragraphBorder}>{trainingLines.note}</p>
              )}
            </div>
          </div>
        )}
      </Container>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Exercise;
