import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ProblemsPage from "./components/ProblemsPage.jsx";
import SubmissonsPage from "./components/SubmissonsPage.jsx";
import ProblemDetailsPage from "./components/ProblemDetailsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemDetailsPage />} />
        <Route path="/submissons" element={<SubmissonsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
