import { useState } from 'react';

function CountDown({ time, nextExercise }) {
  const [countDown, setCountDown] = useState(time);
  if (countDown === 0) setTimeout(() => nextExercise(), 1000);

  setTimeout(() => setCountDown(countDown - 1), 1000);  
  return <div>{countDown}</div>;
}

export default CountDown;
