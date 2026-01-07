import { useState } from "react"
function App() {
  let [state, setState] = useState(0); //구조분해 할당

  const btnClick = () => {
    setState(state + 1);
  }
  console.log(stateVar);
  return (
    <>
      <div>
        <h1>{state}</h1>
        <button onClick={btnClick}>+</button>
      </div>
    </>
  )
}

export default App

