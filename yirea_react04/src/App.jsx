import Controller from "./components/Controller";
import Viewer from "./components/Viewer";
import Even from "./components/Even";
import { useState, useEffect, useRef } from "react";
import Userlist from "./components/Userlist";
import Timer from "./components/Timer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [isTimer, setTimer] = useState(false);

  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      console.log("마운트");
      isMount.current = true;
      return;
    }
    console.log("useEffect업데이트");
  }, [count]);

  function onClickButton(num) {
    setCount(count + num);
  }
  return (
    <>
      <div>
        <button
          onClick={() => {
            setTimer(!isTimer);
          }}
        >
          타이머 {isTimer ? "중지" : "시작"}
        </button>
        {isTimer === true ? <Timer /> : null}
      </div>
      <h1>simple Counter</h1>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {input}
      <div>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </div>
      <div>
        <Controller onClickButton={onClickButton} />
      </div>
      <div>
        <Userlist />
      </div>
    </>
  );
}

export default App;
