import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Otp from "./components/Otp.tsx";
import Home from "./components/Home.tsx";

const App = () => {
  return (
    <Routes>
      {/* Public Routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />

      {/* Private Routes (inside Layout) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
