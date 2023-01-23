import { useState } from 'react';

function CountDown({ time, afterCountDown }) {
  const [countDown, setCountDown] = useState(time);
  
  if(afterCountDown)
  if (countDown === 0) setTimeout(() => afterCountDown(), 1000);

  setTimeout(() => setCountDown(countDown - 1), 1000);  
  return <div>{countDown}</div>;
}

export default CountDown;
