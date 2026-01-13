import Viewer from "../components/Viewer";
import Controller from "../components/Controller";
import Even from "../components/Even";
import { useState } from "react";

function SimpleCountPage() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  function onClickButton(num) {
    setCount(count + num);
  }
  return (
    <>
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
    </>
  );
}
export default SimpleCountPage;
