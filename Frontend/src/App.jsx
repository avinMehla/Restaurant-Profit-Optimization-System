import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MenuPerformance from "./pages/MenuPerformance";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/menu-performance"
          element={<MenuPerformance />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;