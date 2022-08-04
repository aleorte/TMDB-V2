import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./components/Login";
import { FavoriteView } from "./pages/FavoriteView";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styled/theme.tsx'

function App() {
  return (
    <div>
       <ThemeProvider theme={theme}>
          <CssBaseline />
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            {" "}
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/favorites" element={<FavoriteView />}></Route>
        </Routes>
    </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;
