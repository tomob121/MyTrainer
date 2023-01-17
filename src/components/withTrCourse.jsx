import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrCourse from './TrCourse';

const TrCourseHOP = ({ trainingsProps, followUpdates }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  try {
    const training = trainingsProps.filter((training) => training._id === id);
    return (
      <TrCourse
        id={id}
        training={training[0]}
        navigate={navigate}
        followUpdates={followUpdates}
      />
    );
  } catch (error) {}
};

export default TrCourseHOP;
