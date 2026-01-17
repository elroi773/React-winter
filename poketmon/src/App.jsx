import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash"
import Home from "./pages/Home"
import PoketmonList from "./pages/PoketmonList"
import Battle from "./pages/battle";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" replace />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/pokedex" element={<PoketmonList />} />
      <Route path="/battle" element={<Battle />} />
    </Routes>
  )
}

export default App
