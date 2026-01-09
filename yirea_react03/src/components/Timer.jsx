import { use } from "react";
import {useState,useEffect} from "react";

export default function Timer(){
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log("타이머가 시작되었습니다.");
    const intervalVar = setInterval(() => {
      setTime((prev) => prev + 1);
      return () => { };
    }, 1000);

    return () => {
      clearInterval(intervalVar);
      console.log("타이머가 종료되었습니다.");
    };
  }, []);

  return(
    <>
      <h2>타이머 : {time} </h2>
    </>
  )
}