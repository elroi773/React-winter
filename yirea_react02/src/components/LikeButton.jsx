import { useState } from 'react';
export default function LikeButton() {
  const [state, setState] = useState(0);
  const handleClick = () => {
    setState((prev) => prev + 1);
  };
  return (
    <button onClick={handleClick}>👍🏻{state}</button>
  )
}