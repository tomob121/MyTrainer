import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getExercise } from '../service/exerciseService';

function ExerciseDetails() {
  const { id } = useParams();
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    const fetchExercise = async () => {
      const { data: exercise } = await getExercise(id);
      setExercise(exercise);
    };
    fetchExercise();
  }, [id]);

  const styles = {
    exerciseTitle: { textDecoration: 'underline', fontSize: 50 },
  };

  return (
    <Container>
      {<img src='' alt='' />}
      <h1
        style={styles.exerciseTitle}
        className='d-flex justify-content-center mt-5'
      >
        {exercise.title}
      </h1>
    </Container>
  );
}

export default ExerciseDetails;
