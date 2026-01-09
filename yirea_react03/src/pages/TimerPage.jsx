import Timer from '../components/Timer';
import { useState, useEffect, useRef } from "react";
export default function TimerPage(){
    const [isTimer, setTimer] = useState(false);
  return(
    <>
      <button onClick={() => setTimer(!isTimer)}>타이머{isTimer ? '중지' : '시작'}</button>
      {isTimer === true ? <Timer /> : null}
    </>
  )
}