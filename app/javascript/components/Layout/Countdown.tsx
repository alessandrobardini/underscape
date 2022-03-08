import React from 'react';
import { useCountdown } from 'hooks/useCountdown';

import './Countdown.scss'

type CountdownTimerProps = {
  targetDate: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if(days + hours + minutes + seconds <= 0) {
    window.location.reload()
  }

  return <div className='Countdown'>
      <ShowCounter minutes={minutes} seconds={seconds}/>
    </div>
}

type ShowCounterProps = {
  minutes: number
  seconds: number
}

const ShowCounter: React.FC<ShowCounterProps> = ({ minutes, seconds }) => {
  return (
    <div className={`show-counter ${minutes < 10 ? 'danger' : ''}`}>
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
