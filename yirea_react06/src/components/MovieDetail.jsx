import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/App.css";

export default function MovieDetail() {
  const { id } = useParams(); // URL에서 영화 ID 추출
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = ""; // API 키 입력
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching detail:", error);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← 뒤로가기
      </button>

      <div className="detail-content">
        <div className="detail-poster">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "https://placehold.co/500x750"
            }
            alt={movie.title}
          />
        </div>

        <div className="detail-info">
          <h2 className="detail-title">{movie.title}</h2>
          <p className="tagline">{movie.tagline}</p>

          <div className="detail-meta-row">
            <span>📅 {movie.release_date}</span>
            <span>⏱ {movie.runtime}분</span>
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
          </div>

          <div className="genres">
            {movie.genres.map((g) => (
              <span key={g.id} className="genre-badge">
                {g.name}
              </span>
            ))}
          </div>

          <div className="overview-section">
            <h3>줄거리</h3>
            <p>{movie.overview || "등록된 줄거리가 없습니다."}</p>
          </div>
        </div>
      </div>

      {/* 배경 이미지를 깔아주는 효과 (선택 사항) */}
      <div
        className="backdrop-image"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      />
    </div>
  );
}

