import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ExerciseEndScreen = ({ trainingsProps }) => {
  const { id } = useParams();
  const [training] = trainingsProps.filter(
    (training) => training.id === parseInt(id)
  );

  return (
    <Container>
      <div>
        <h1>End of {training.title}</h1>
        {training.trainingLines.map((line) => (
          <li className='m-3' key={line.id}>
            {line.exercise.title}
          </li>
        ))}
      </div>
      Duration: {training.timer[training.timer.length - 1]}
    </Container>
  );
};

export default ExerciseEndScreen;
