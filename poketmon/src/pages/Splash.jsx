import Background from "../assets/background.png";
import Logo from "../assets/Logo.png";
import "./Splash.css";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="splash" style={{ backgroundImage: `url(${Background})` }}>
      <img className="splash__logo" src={Logo} alt="Logo" />

      <button className="splash__btn" onClick={goHome}>
        시작하기
      </button>
    </div>
  );
}