import { useState } from "react";
function App() {
  let [state, setState] = useState(0); //구조분해 할당
  const [blub, setBlub] = useState("OFF");
  const toggleBlub = () => {
    setBlub((prev) => (prev === "ON" ? "OFF" : "ON"));
  };
  const btnClick = () => {
    setState((prev) => prev + 1);
  };
  console.log(state);
  const Light = ({isOn}) => {
    return(
      <>
        {isOn === "ON" ? (
          <h1 style={{backgroundColor: "orange"}}>ON</h1>
        ) : (
          <h1 style={{backgroundColor: "gray"}}>OFF</h1>
        )}
      </>
    )
  }
   return (
    <>
      <div>
        <h1>{state}</h1>
        <button onClick={btnClick}>+</button>
      </div>
      <div>
        {/* 끄고 켜기 버튼 */}
        <Light isOn={blub} />
        <button onClick={toggleBlub}>끄기/켜기</button> 
      </div>
    </>
  )
}

export default App
