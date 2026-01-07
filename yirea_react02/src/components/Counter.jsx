import { useState } from "react";

export default function Counter() {
  const [state, setState] = useState(0); // 구조분해 할당

  const inc = () => setState((prev) => prev + 1);
  const dec = () => setState((prev) => prev - 1);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span>Count: {state}</span>
      <br />
      <button onClick={dec}>감소</button>
      <button onClick={inc}>증가</button>
    </div>
  );
}
