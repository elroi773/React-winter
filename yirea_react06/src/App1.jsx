import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Header from "./components/Header";
import "./style/App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
