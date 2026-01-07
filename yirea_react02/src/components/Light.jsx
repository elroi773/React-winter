import { useState } from "react";

export default function Light() {
  const [on, setOn] = useState(false);

  const clickBtn = () => {
    setOn(!on);
  };

  return (
    <div>
      {on ? (
        <h1 style={{ backgroundColor: "orange" }}>ON</h1>
      ) : (
        <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
      )}

      <button onClick={clickBtn}>{on ? "끄기" : "켜기"}</button>
    </div>
  );
}