import { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  let [dateVar, setDateVar] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalVar = setInterval(() => {
      setDateVar((prev) => prev + 1);
      return () => {
        clearInterval(intervalVar);
      };
    }, 1000);
  }, []);

  return (
    <div className="Header">
      <h1>ToDo List 앱</h1>
      <h3>오늘은 🗓️ : {Date(dateVar)}</h3>
    </div>
  );
}
export default Header;
