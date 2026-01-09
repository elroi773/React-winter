import Controller from "./components/Controller";
import Viewer from "./components/Viewer";
import Even from "./components/Even";
import UserList from "./components/UserList";
import Timer from "./components/Timer";
import { useState, useEffect, useRef } from "react";
import { use } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [isTimer, setTimer] = useState(false);

  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      console.log("마운트 될 때 실행됩니다.");
      isMount.current = true;
      return;
    }
    console.log("useEffect 업데이트");
  }, [count]);

  function onClickButton(num) {
    setCount(count + num);
  }
  return (
    <>
      <div>
        <button onClick={() => setTimer(!isTimer)}>타이머 {isTimer ? "정지" : "시작"}</button>
        <Timer isTimer={isTimer} />
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
        <UserList />
      </div>
    </>
  );
}

export default App;
