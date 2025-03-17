import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Otp from "./components/Otp.tsx";
import CardContainer from "./components/CardContainer.tsx";
import ContextProvider from "./context/Contexts.tsx";
import PrivateRoute from "./components/Private/PrivateRoute.tsx";
import OtpRouteGuard from "./components/Private/OtpRouteGuard.tsx";

const App = () => {
  return (
    <ContextProvider>
      <MantineProvider>
        <Routes>
          {/* Public Routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<OtpRouteGuard />}>
            <Route path="/otp" element={<Otp />} />
          </Route>

          {/* Private Routes (inside Layout) */}

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<CardContainer />} />
            </Route>
          </Route>
        </Routes>
      </MantineProvider>
    </ContextProvider>
  );
};

export default App;
