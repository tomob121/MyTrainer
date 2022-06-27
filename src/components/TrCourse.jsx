import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrCourseClass from './TrCourseClass';

const TrCourseHOP = ({ trainingsProps }) => {
  const { id } = useParams();
  const training = trainingsProps.filter(
    (training) => training.id === parseInt(id)
  );
  const navigate = useNavigate();

  return <TrCourseClass id={id} training={training[0]} navigate={navigate} />;
};

export default TrCourseHOP;
