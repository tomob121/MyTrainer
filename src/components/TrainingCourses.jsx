import React from 'react';
import { Container } from 'react-bootstrap';
import { getTraining } from '../service/fakeTrainingCourses';

const TrainingCourses = () => {
  return (
    <Container>
      <h1>Training Courses {console.log(getTraining(2))}</h1>
    </Container>
  );
};

export default TrainingCourses;
