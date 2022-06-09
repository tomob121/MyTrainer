import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraining } from './../service/fakeTrainingCourses';
import { Container, Button } from 'react-bootstrap';

const Exercise = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(getTraining(parseInt(id)));
  const [exerciseStage, setExerciseStage] = useState(0);

  return (
    <Container>
      <div>
        {training.trainingLines[exerciseStage].exercise.title}
        {training.trainingLines[exerciseStage].reps}
      </div>
      <Button onClick={() => setExerciseStage(exerciseStage + 1)}>
        Skip rest
      </Button>
    </Container>
  );
};

export default Exercise;
