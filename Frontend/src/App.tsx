import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Otp from "./components/Otp.tsx";
import CardContainer from "./components/CardContainer.tsx";

const App = () => {
  return (
    <MantineProvider>
      <Routes>
        {/* Public Routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />

        {/* Private Routes (inside Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<CardContainer />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
};

export default App;
