import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrCourse from './TrCourse';
import { Training } from '../../utility/interface';

interface Props {
  trainingsProps: Training[],
}

const TrCoursesHop: React.FC<Props> = ({trainingsProps}) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const training = trainingsProps.filter((training) => training._id === id)[0]

  return <TrCourse
    id={id!}
    navigate = {navigate}
    training = {training}

  />
}
 
export default TrCoursesHop;



