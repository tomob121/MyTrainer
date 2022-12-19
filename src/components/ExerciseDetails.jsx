import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ExerciseDetails = ({ exercises }) => {
  const { id } = useParams();
  const exercise = exercises.filter((exercise) => exercise._id == id)[0];
  console.log(exercise);

  const styles = {
    exerciseTitle: { textDecoration: 'underline', fontSize: 50 },
  };

  return (
    <Container>
      <img src='' alt='' />
      <h1
        style={styles.exerciseTitle}
        className='d-flex justify-content-center mt-5'
      >
        {exercise.title}
      </h1>
    </Container>
  );
};

export default ExerciseDetails;
