// src/App.jsx
import "./index.css"; // Make sure Tailwind's styles are being imported
import LandingPage from "./Components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import ClientWebPage from "./Components/ChatbotWidget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toasts

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client-website" element={<ClientWebPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
