import { useEffect } from "react";

export default function Event() {
 useEffect(() => {
    return () => {
     // mount 될 때 
     console.log("unmount 될 때 실행됩니다.");
    };
  }, []); 
  return(
    <div>짝수</div>
  )
}