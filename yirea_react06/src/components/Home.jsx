import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/App.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "403c12f87842be25cde1a02b954f1aa0"; // API 키 입력
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  console.log(movies);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/movie/${movie.id}`}  style={{ textDecoration: "none", color: "inherit" }}  >
            <img src={ movie.poster_path? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://placehold.co/500x750"}
              alt={movie.title} className="movie-poster"/>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="movie-meta">
                <span className="rating">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

