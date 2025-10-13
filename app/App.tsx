import { Routes, Route } from "react-router-dom";
import Home from "../app/routes/home"; // adjust path if needed

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
