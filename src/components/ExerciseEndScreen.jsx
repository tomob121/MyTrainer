import React from 'react';
import { useParams } from 'react-router-dom';

const ExerciseEndScreen = () => {
  const { id } = useParams();

  return <h1>This is the end of {id}</h1>;
};

export default ExerciseEndScreen;
