import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ExerciseDetails = ({ exercises }) => {
  const { id } = useParams();
  const exercise = exercises.filter(
    (exercise) => exercise.id === parseInt(id)
  )[0];

  return (
    <Container>
      <h1 className='d-flex justify-content-center mt-5'>
        This is exercise {exercise.title}
      </h1>
    </Container>
  );
};

export default ExerciseDetails;
