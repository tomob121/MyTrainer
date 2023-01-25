import { useState } from 'react';

type CountDown = {
  time: number,
  afterCountDown: () => void
}

function CountDown({ time, afterCountDown }: CountDown) {
  const [countDown, setCountDown] = useState(time);
  
  if(afterCountDown)
  if (countDown === 0) setTimeout(() => afterCountDown(), 1000);

  setTimeout(() => setCountDown(countDown - 1), 1000);  
  return <div>{countDown}</div>;
}

export default CountDown;
