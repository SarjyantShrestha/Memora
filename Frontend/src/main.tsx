import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Otp from "./components/Otp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} /> {/* New Login route */}
        <Route path="/signup" element={<Signup />} /> {/* New Login route */}
        <Route path="/otp" element={<Otp />} /> {/* New Login route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
