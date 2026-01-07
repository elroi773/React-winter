import { useState } from "react"
function App() {
  let [state, setState] = useState(0); //구조분해 할당
  const [blub, setBlub] = useState("OFF");
  const btnClick = () => {
    setState(state + 1);
  }
  console.log(state);
  return (
    <>
      <div>
        <h1>{state}</h1>
        <button onClick={btnClick}>+</button>
      </div>
      <div>
        {/* 끄고 켜기 버튼 */}
        <h1>{blub}</h1>
        <button onClick={() => {
          if (blub === "OFF") {
            setBlub("ON");
          } else {
            setBlub("OFF");
          }
        }}>토글</button> 
      </div>
    </>
  )
}

export default App

