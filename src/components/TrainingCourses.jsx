import React from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const TrainingCourses = ({ trainingsProps }) => {
  const styles = {
    cardStyle: {
      width: '18rem',
      cursor: 'pointer',
      color: 'white',
      maxHeight: 270,
    },
    cardTextStyle: {
      maxHeight: 200,
    },
  };

  const trainings = trainingsProps;
  const navigate = useNavigate();

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds; // Return is MM : SS
  }

  function handleAvrageTrainingDuration(trainingID) {
    let filteredTraining = trainings.filter(
      (training) => training.id === trainingID
    );

    let sum = filteredTraining[0].timer.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    sum = sum / filteredTraining[0].timer.length;

    if (!sum) sum = 0;

    return convertHMS(sum);
  }

  return (
    <Container>
      {console.log()}
      {trainings.map((training) => (
        <Card
          onClick={() => navigate(`/trainingCourses/${training.id}`)}
          className='m-2 p-2 bg-primary'
          key={training.id}
          style={styles.cardStyle}
        >
          <Card.Title>{training.title}</Card.Title>

          <SimpleBar autoHide={false} style={styles.cardTextStyle}>
            {training.trainingLines.map((trainingLine) => (
              <Card.Text key={trainingLine.id}>
                {trainingLine.exercise.title}
              </Card.Text>
            ))}
          </SimpleBar>

          <div style={{ textAlign: 'end' }}>
            Avg. Duration: {handleAvrageTrainingDuration(training.id)}
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default TrainingCourses;
