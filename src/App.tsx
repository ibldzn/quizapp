import { QuestionsProvider } from "./context/Question";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Quiz } from "./pages/Quiz";

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Quiz />} />
        </Routes>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
