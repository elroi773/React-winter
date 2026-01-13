import { useEffect, useState } from "react";

function Timer() {
  let [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalVar = setInterval(() => {
      setSeconds((prev) => prev + 1);
      return () => {
        clearInterval(intervalVar);
      };
    }, 1000);
  }, []);

  return (
    <>
      <h1>타이머: {seconds}초</h1>
    </>
  );
}

export default Timer;
