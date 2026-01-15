import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import Header2 from "./components/Header2";
import Login from "./components/Login";
import { AuthProvider } from "./components/AuthProvider";

import "./style/App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header2 />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
