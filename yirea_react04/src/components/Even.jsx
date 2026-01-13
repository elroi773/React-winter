import { useEffect } from "react";

function Even() {
  useEffect(() => {
    return () => {
      console.log("언마운트");
    }; //클린업, 정리함수
  }, []);
  return <>짝수</>;
}
export default Even;
