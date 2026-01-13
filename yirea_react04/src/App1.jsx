import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Userlist from "./components/Userlist";
import Home from "./components/Home";
import TimerPage from "./pages/Timerpage";
import Navi from "./components/common/Navi";
import SimpleCountPage from "./pages/SimpleCounterPage";
import TodoApp from "./pages/TodoApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navi />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usermenu" element={<Userlist />} />
        <Route path="/timermenu" element={<TimerPage />} />
        <Route path="/simplecountermenu" element={<SimpleCountPage />} />
        <Route path="/todomenu" element={<TodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
