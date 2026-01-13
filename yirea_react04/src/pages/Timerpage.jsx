import { useState } from "react";
import Timer from "../components/Timer";

function TimerPage() {
  const [isTimer, setTimer] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setTimer(isTimer);
        }}
      >
        타이머 {isTimer ? "중지" : "시작"}
      </button>
      {isTimer === true ? <Timer /> : null}
    </>
  );
}
export default TimerPage;
