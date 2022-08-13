import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./components/Login";
import { FavoriteView } from "./pages/FavoriteView";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import theme from './styled/theme.tsx'
import store from "./State/store";
import { NotFound } from "./components/404";

function App() {
  return (
    <div>
       <Provider store={store}>
       <ThemeProvider theme={theme}>
          <CssBaseline />
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            {" "}
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/favorites/:userId" element={<FavoriteView />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </Router>
    </ThemeProvider>
    </Provider>
    </div>
  );
}

export default App;
