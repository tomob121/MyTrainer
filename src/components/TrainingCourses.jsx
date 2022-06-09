import React from 'react';
import { Container } from 'react-bootstrap';
import { getTrainings } from '../service/fakeTrainingCourses';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './TrainingCourses.css';

const TrainingCourses = () => {
  const styles = {
    cardStyle: {
      width: '18rem',
      cursor: 'pointer',
      color: 'white',
      maxHeight: 270,
    },
    cardTextStyle: {
      overflow: 'auto',
      scrollbarColor: 'auto',
    },
  };

  const trainings = getTrainings();
  const navigate = useNavigate();
  return (
    <Container>
      {trainings.map((training) => (
        <Card
          onClick={() => navigate(`/trainingCourses/${training.id}`)}
          className='m-2 p-2 bg-primary'
          key={training.id}
          style={styles.cardStyle}
        >
          <Card.Title>{training.title}</Card.Title>
          <div style={styles.cardTextStyle}>
            {training.trainingLines.map((trainingLine) => (
              <Card.Text key={trainingLine.id}>
                {trainingLine.exercise.title}
              </Card.Text>
            ))}
          </div>
          <div style={{ textAlign: 'end' }}>
            Duration: {training.duration} min
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default TrainingCourses;
