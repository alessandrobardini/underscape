import React from 'react';
import { useCountdown } from 'hooks/useCountdown';

import './Countdown.scss'

type CountdownTimerProps = {
  targetDate: number
  onFinish?: () => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onFinish }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if(days + hours + minutes + seconds <= 0) {
    onFinish ? onFinish() : window.location.reload()
  }

  return <div className='Countdown'>
      <ShowCounter minutes={minutes} seconds={seconds} hours={hours} />
    </div>
}

type ShowCounterProps = {
  hours: number
  minutes: number
  seconds: number
}

const ShowCounter: React.FC<ShowCounterProps> = ({ minutes, seconds, hours }) => {
  return (
    <div className={`show-counter ${(minutes < 10 && hours === 0) ? 'danger' : ''}`}>
      {hours > 0 && <>
        <DateTimeDisplay value={hours} />
      <span>:</span>
      </>}
      <DateTimeDisplay value={minutes} />
      <span>:</span>
      <DateTimeDisplay value={seconds} />
    </div>
  )
}

type DateTimeDisplayProps = {
  value: number
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ value }) => {
  return (
    <span>
      {`${value.toString().length === 1 ? '0' : ''}${value}`}
    </span>
  )
}

export default CountdownTimer;
