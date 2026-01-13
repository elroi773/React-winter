import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App1.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
