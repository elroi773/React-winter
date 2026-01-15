import "../style/App.css";
export default function Header() {
  return (
    <header className="header">      
      <h1>
        <a href="/" style={{ color: "white", textDecoration: "none" }}> {/* a태그도 사용은 가능 */}
          🎬 TMDB Movies
        </a>
      </h1>
    </header>
  );
}
