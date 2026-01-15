import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import "../style/App.css";

export default function Header2() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // 로그아웃 후 홈으로
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            🎬 TMDB Movies
          </Link>
        </h1>

        <div className="auth-menu">
          {user ? (
            <>
              <span className="user-welcome">
                반갑습니다, <b>{user.username}</b>님!
              </span>
              <button onClick={handleLogout} className="nav-button logout">
                로그아웃dd
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="nav-button login">로그인</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
