import { useState } from 'react'

type CountDownProps = {
  time: number
  afterCountDown: () => void
}

function CountDown({ time, afterCountDown }: CountDownProps) {
  const [countDownTime, setCountDown] = useState(time)

  if (afterCountDown)
    if (countDownTime === 0) setTimeout(() => afterCountDown())

  setTimeout(() => setCountDown(countDownTime - 1), 1000)
  return <div>{countDownTime}</div>
}

export default CountDown
