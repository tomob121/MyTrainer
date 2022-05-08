import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraining } from '../service/fakeTrainingCourses';
import { Container } from 'react-bootstrap';
import TrCourseClass from './TrCourseClass';

const TrCourseHOP = () => {
  const { id } = useParams();
  const training = getTraining(parseInt(id));

  return <TrCourseClass id={id} training={training} />;
};

export default TrCourseHOP;
