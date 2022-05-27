import React from 'react';
import { Container } from 'react-bootstrap';
import { getTraining, getTrainings } from '../service/fakeTrainingCourses';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TrainingCourses = () => {
  const myStyle = { width: '18rem', cursor: 'pointer', color: 'white' };
  const trainings = getTrainings();
  const navigate = useNavigate();
  return (
    <Container>
      {trainings.map((training) => (
        <Card
          onClick={() => navigate(`/trainingCourses/${training.id}`)}
          className='m-2 p-2 bg-primary'
          key={training.id}
          style={myStyle}
        >
          <Card.Title>{training.title}</Card.Title>
          {training.trainingLines.map((trainingLine) => (
            <Card.Text key={trainingLine.id}>
              {trainingLine.exercise.title}
            </Card.Text>
          ))}
          <div style={{ textAlign: 'end' }}>
            Duration: {training.duration} min
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default TrainingCourses;
