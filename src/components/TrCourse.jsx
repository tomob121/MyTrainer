import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTraining } from '../service/fakeTrainingCourses';
import TrCourseClass from './TrCourseClass';

const TrCourseHOP = () => {
  const { id } = useParams();
  const training = getTraining(parseInt(id));
  const navigate = useNavigate();

  return <TrCourseClass id={id} training={training} navigate={navigate} />;
};

export default TrCourseHOP;
