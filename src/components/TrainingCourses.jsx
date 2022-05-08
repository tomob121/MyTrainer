import React from 'react';
import { Container } from 'react-bootstrap';
import { getTraining } from '../service/fakeTrainingCourses';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TrainingCourses = () => {
  const myStyle = { width: '18rem', cursor: 'pointer', color: 'white' };
  const training = [getTraining(1), getTraining(2), getTraining(3)];
  const navigate = useNavigate();
  return (
    <Container>
      {training.map((trainings) => (
        <Card
          onClick={() => navigate(`/trainingCourses/${trainings.id}`)}
          className='m-2 p-2 bg-primary'
          key={trainings.id}
          style={myStyle}
        >
          <Card.Title>{trainings.title}</Card.Title>
          {trainings.exercises.map((exercise) => (
            <Card.Text key={exercise.id}>{exercise.title}</Card.Text>
          ))}
          <div style={{ textAlign: 'end' }}>
            Duration: {trainings.duration} min
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default TrainingCourses;
