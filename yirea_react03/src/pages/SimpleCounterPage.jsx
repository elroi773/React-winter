import { useState } from 'react'
import Viewer from '../components/Viewer'
import Controller from '../components/Controller'
import Even from '../components/Even'

function SimpleCounterPage() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} type="text" /> {input}
      <Viewer count={count} />
      <Controller setCount={setCount} />
      <Even num={count} />
    </>
  )
}

export default SimpleCounterPage

