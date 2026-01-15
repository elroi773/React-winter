import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import "../style/App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return alert("아이디를 입력해주세요.");

    login(username);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="아이디를 입력하세요" value={username} onChange={(e) => setUsername(e.target.value)}
            className="login-input"/>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

