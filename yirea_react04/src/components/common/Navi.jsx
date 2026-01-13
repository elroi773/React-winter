import { Link, useNavigate } from "react-router-dom";
function Navi() {
  const nav = useNavigate();

  function onClickButton() {
    nav("/usermenu");
  }
  return (
    <>
      <div>
        <Link to={"/"}>[Home]</Link>
        <Link to={"/usermenu"}>[사용자목록]</Link>
        <Link to={"/timermenu"}>[타이머]</Link>
        <button onClick={onClickButton}>사용자목록 버튼</button>
        <Link to={"/simplecountermenu"}>[간단한 카운터]</Link>
        <Link to={"/todomenu"}>[Todo list 앱]</Link>
      </div>
    </>
  );
}
export default Navi;
