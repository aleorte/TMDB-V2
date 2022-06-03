import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MovieDetails } from "./components/MovieDetails";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";

function App() {
  const login = false;
  return (
    <Router>
      <header>
        {login ? (
          <Link to="/logout">Salir</Link>
        ) : (
          <Link to="/login">Iniciar Sesión</Link>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            {" "}
          </Route>
          <Route path="/" element={<LandingPage />}>
            {" "}
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
