import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getTrainingLine } from '../service/trainingLineService.tsx';
import { getTraining } from '../service/trainingService.tsx';
import { getTrainings } from '../service/trainingService.tsx';

const ExerciseEndScreen = () => {
  const { id } = useParams();
  const [trainingLine, setTrainingLine] = useState([]);
  const [training, setTraining] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: trainingLine } = await getTrainingLine(id);
      setTrainingLine(trainingLine);
      const { data: training } = await getTrainings();
      setTraining(training.filter((training) => training._id === id)[0]);
    };
    fetchData();
  }, []);
  console.log(training);
  return (
    <Container>
      <div>
        <h1>End of {training.title}</h1>
        {trainingLine.map((line) => (
          <li className='m-3' key={line._id}>
            {line.exerciseId.title}
          </li>
        ))}
      </div>
    </Container>
  );
};

export default ExerciseEndScreen;
